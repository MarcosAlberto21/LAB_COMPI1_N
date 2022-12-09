/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

"Evaluar"           return 'REVALUAR';
";"                 return 'PTCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';

"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';


//Reservadas
"null"                  return 'resnull';
"integer"               return 'resinteger';
"double"                return 'resdouble';
"char"                  return 'reschar';
"string"                return 'resstring';
"true"                  return 'restrue';
"false"                 return 'resfalse';
"if"                    return 'resif';
"else"                  return 'reselse';
"print"                 return 'resprint';
"for"                   return 'resfor';
"while"                 return 'reswhile';
"do"                    return 'resdo';
"boolean"               return 'resboolean';
"void"                  return 'resvoid';


//simbolos
"{"              return 'corchetea';     
"}"              return 'corchetec';
"("              return 'parenta';     
")"              return 'parentc';
","              return 'coma';
"."              return 'punto';
"="              return 'igual';


([a-zA-Z"_"])[a-z0-9A-Z"_""ñ""Ñ"]*       return 'id';


/* Espacios en blanco */
[ \r\t]+                  {}
\n                        {}

[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%{
	const Reportes = require('./reportes.js');
	const Declaracion = require('./Declaracion.js');
	const SymbolTable = require('./tabla_simbolos.js');
	const Type = require('./tipo.js')
	var reportes = new Reportes();
	var tabla_simbolo = new SymbolTable(null);
	tabla_simbolo.reportes = reportes;

%}

/* Asociación de operadores y precedencia */

%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF {
		
		  for(var i = 0; i< $1.length; i++){
            if($1[i])
                $1[i].operar(tabla_simbolo, reportes)
        }

		return reportes;
	}
;

instrucciones
	: instrucciones  instruccion  {$$ = $1; $$.push($2);}
	| instruccion  {$$ = []; $$.push($1)}
	| error instruccion { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
			  reportes.putError_sintactico({lexema:yytext, fila: this._$.first_line, columna:this._$.first_column })
			}
;

instruccion
	: DECLARACION PTCOMA  {  console.log("Paso a aqui 2", $1); if($1 != null){$$ = $1}}
	// | REVALUAR CORIZQ expresion CORDER PTCOMA {
	// 	console.log('El valor de la expresión es: ' + $3);
	// }
;

DECLARACION
     : TYPE id igual expresion { console.log("Paso a aqui", $1); $$ = new Declaracion($2,$1,Type.VARIABLE,Type.VARIABLE, 'RESOLVER EXPRESION' ,this._$.first_line,this._$.first_column);}
;

expresion
	: MENOS expresion %prec UMENOS  { $$ = $2 *-1; }
	| expresion MAS expresion       { $$ = $1 + $3; }
	| expresion MENOS expresion     { $$ = $1 - $3; }
	| expresion POR expresion       { $$ = $1 * $3; }
	| expresion DIVIDIDO expresion  { $$ = $1 / $3; }
	| ENTERO                        { $$ = Number($1); }
	| DECIMAL                       { $$ = Number($1); }
	| PARIZQ expresion PARDER       { $$ = $2; }
;


TYPE
     : resinteger {$$ = Type.ENTERO}
     | resdouble {$$ = Type.DOUBLE}
     | resboolean {$$ = Type.BOOLEANO}
     | resstring {$$ = Type.STRING}
;
