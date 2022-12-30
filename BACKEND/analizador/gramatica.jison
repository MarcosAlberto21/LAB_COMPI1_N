/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    const Nodo=require('./nodo_arbol');
%}
%lex
%options case-insensitive
%%




"["                 %{  return 'tk_ca';  %}
"]"                 %{  return 'tk_cc';  %}
"+"                 %{ return 'tk_mas'; %}
"-"                 %{ return 'tk_menos';%}
"*"                 %{ return 'tk_multiplicar';%}
"/"                 %{ return 'tk_division'%}
"("                 %{  return 'tk_pa';  %}
")"                 %{  return 'tk_pc';  %}
";"                 %{  return 'tk_punto_coma';  %}
"="                 %{  return 'tk_igual';  %}

"integer"               return 'tk_integer';
"double"                return 'tk_double';
"char"                  return 'tk_char';
"string"                return 'tk_string';


([a-zA-Z"_"])[a-z0-9A-Z"_""ñ""Ñ"]*       return 'id';
// ([\"]("\\\""|[^"])*[^\\][\"])|[\"][\"]   return 'cadena';
[0-9]+("."[0-9])?\b            %{  return 'tk_decimal';  %}



[ \t\r\n\f]+         { /*se ignoran*/ }




<<EOF>>     {  return 'EOF';   }

.	       { console.log('Error Lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
  

/lex

%left tk_mas tk_menos
%left tk_multiplicar tk_division
%left tk_pa tk_pc

%start INICIO
%% 

INICIO : LINSTRUCCIONES EOF { $$= new Nodo("INICIO","");
     $$.agregarHijo($1);
     return $$;  }

     ;

LINSTRUCCIONES: LINSTRUCCIONES INSTRUCCION {$$= new Nodo("LINSTRUCCIONES","");
                                    $$.agregarHijo($1);
                                    var inst =  new Nodo("INSTRUCCION","");
                                    inst.agregarHijo($2)
                                    $$.agregarHijo(inst); }
       | INSTRUCCION { 
        // console.log("tengo una declaracion")
        $$= new Nodo("INSTRUCCION",""); 
                         $$.agregarHijo($1);
                     } ;

INSTRUCCION: DECLARACION tk_punto_coma  {  $$ = $1};

DECLARACION: TIPO id tk_igual LEXPRESION  { 
        // console.log("tengo una declaracion")
    $$ = new Nodo("DECLARACION","")
    $$.agregarHijo($1)
    $$.agregarHijo(new Nodo($2,"identificador"))
    $$.agregarHijo($4)
                                           
                                             };

TIPO : tk_integer {  $$ = new Nodo($1,"tipo_dato");}
     | tk_double {  $$ = new Nodo($1,"tipo_dato"); } 
     | tk_string {  $$ = new Nodo($1,"tipo_dato"); }
     | tk_char {  $$ = new Nodo($1,"tipo_dato");} ;


LEXPRESION: LEXPRESION EXPRESION {$$= new Nodo("LEXPRESION","");
                                    $$.agregarHijo($1);
                                    var expre =  new Nodo("EXPRESION","");
                                    expre.agregarHijo($2)
                                    $$.agregarHijo(expre);
                                }
    | EXPRESION { 
        $$= new Nodo("EXPRESION","");
        $$.agregarHijo($1);
               
    };

EXPRESION:   E   { $$ = $1                            
    }
    | error  {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};

E: E tk_mas E { $$ = new Nodo("+","suma");
                        $$.agregarHijo($1);
                        $$.agregarHijo($3);
                        }
    | E tk_menos E { $$ = new Nodo("-","resta")
                        $$.agregarHijo($1);
                        $$.agregarHijo($3);
                        }
    | E tk_multiplicar E { $$ = new Nodo("*","multiplicar")
                        $$.agregarHijo($1);
                        $$.agregarHijo($3);
                        }
    | E tk_division E { $$ = new Nodo("/","division")
                        $$.agregarHijo($1);
                        $$.agregarHijo($3);
                        }
    | tk_pa E tk_pc { $$ = $2
                     
                    }
    | tk_pa error tk_pc {console.log("Error sintactico en: "+ $1 +"ERROR" +$3+ " en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);}
    | tk_decimal { $$ = new Nodo($1,"decimal");
                 
                   };
