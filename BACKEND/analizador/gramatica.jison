/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    const Nodo=require('./nodo_arbol');
%}
%lex
%options case-insensitive
%%

"EXPRESION"         %{ return 'tk_expresion';%}
[0-9]+("."[0-9])?\b            %{  return 'tk_decimal';  %}
"["                 %{  return 'tk_ca';  %}
"]"                 %{  return 'tk_cc';  %}
"+"                 %{ return 'tk_mas'; %}
"-"                 %{ return 'tk_menos';%}
"*"                 %{ return 'tk_multiplicar';%}
"/"                 %{ return 'tk_division'%}
"("                 %{  return 'tk_pa';  %}
")"                 %{  return 'tk_pc';  %}
";"                 %{  return 'tk_punto_coma';  %}



[ \t\r\n\f]+         { /*se ignoran*/ }

<<EOF>>     {  return 'EOF';   }

.	       { console.log('Error Lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
  

/lex

%left tk_mas tk_menos
%left tk_multiplicar tk_division
%left tk_pa tk_pc

%start INICIO
%% 

INICIO: LEXPRESION EOF { $$= new Nodo("INICIO","");
     $$.agregarHijo($1);
     return $$;
    };

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

EXPRESION: tk_expresion tk_ca E tk_cc tk_punto_coma { $$ = $3
                                                 
                                                   
    }
    | error tk_punto_coma {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};

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
