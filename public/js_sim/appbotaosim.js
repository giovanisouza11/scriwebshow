var AImageB = new Image();
AImageB.src = "/img_sim/botoessim.png";
var canvas1;
var context1;
var valor_chave = new Array(14);
var simEdicao = 0; 
//desenha os botoes
function draw_botoessim() {
    canvas1 = document.getElementById("tela1");
	context1 = canvas1.getContext("2d");
    canvas1.width = 75;
    canvas1.height = 570;

	for(i=1; i<13; i++) {
        if (valor_chave[i] === undefined)
			valor_chave[i] = 0;
        context1.drawImage(AImageB, 70*valor_chave[i]+(140*simEdicao), 45*(i-1), 70, 45, 5,(i-1)*47, 70, 45);
	}
}

//Verifica QUAL botao foi acionado
//Separa em tres grupos: 0 a 10: comandos do software, 11 a 20: edicao do ladder, 21 a 30: funcoes do ladder
function tBotao() {
	var posicaoy= parseInt((window.event.clientY-30)/47);

	if ((posicaoy >=0) && (posicaoy < 12))
	{
		for(i=1; i<13; i++)
			valor_chave[i] = 0;
		valor_chave[posicaoy+1]=1;
	}

	if (valor_chave[12]==1){
        window.open("/About", " About SCriWeb", "height=600,width=600");
	    valor_chave[12]=0;
	}
	if (valor_chave[11]==1){
        window.open("/helpsim", "Help SCriWeb", "height=800,width=1000");
	    valor_chave[11]=0;
	}
	if (valor_chave[10]==1){
        window.open("/configsim", "Config SCriWeb", "height=320,width=500");
	    valor_chave[10]=0;
	}
	if (simEdicao==0 && valor_chave[2]==1){
        var inputCSV = document.createElement('input');
	 inputCSV.type = 'file';
	inputCSV.accept = '.CSV';
	inputCSV.click();
	inputCSV.onchange = function() {
	    var file = this.files[0];
		leitorDeCSV.readAsText(file);
		simPath = simPathInicial + file.name.slice(0,file.name.length -4) + '/';
		};
	comandos = 0;	
	valor_chave[4]=0;
	valor_chave[5]=1;
	}
	if (simEdicao==0 && valor_chave[3]==1){
	    let texto = '0_id, 1_tipo, 2_nome, 3_var_1, 4_var_2, 5_pos_x_inicial, 6_dpos_x, 7_pos_x_final, 8_pos_y_inicial, 9_dpos_y, 10_pos_y_final, 11_inc_x1, 12_inc_x2, 13_inc_y1, 14_inc_y2, 15_var1_dependente, 16_var2_dependente, 17_piscar, 18_tempo_pisca, 19_figura, 20_funcao, 21_reserva, 22_reserva, 23_reserva, 24_reserva \n';
	    for (var i=0; i<(ArrayObjStatic.length/20); i++) {
			texto += i +','+ArrayObjStatic[i*20+17]+',';
			for (var j=0; j<17; j++)
			    texto += ArrayObjStatic[(i*20)+j]+',';
			if (ArrayObjStatic[(i*20)+17]>1 && ArrayObjStatic[(i*20)+17]<5) 
				texto += ArrayImagens[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			if (ArrayObjStatic[(i*20)+17]==1) 
				texto += ArrayLabel[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			if (ArrayObjStatic[(i*20)+17]==6 || ArrayObjStatic[(i*20)+17]==7) 
				texto += ArrayObjDinamic[i*10+5]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			//texto += ArrayObjDinamic[i*10+5] +',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			texto += '\n';
		}
        let titulo ='SimScriWeb';
        var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        saveAs(blob, titulo + ".csv");
        valor_chave[3]=0;
	}
	if (simEdicao==0 && valor_chave[4]==1){
		comandos = 1;
	}
	if (simEdicao==0 && valor_chave[5]==1){
		comandos = 0;
	}
	if (simEdicao==0 && valor_chave[6]==1){
		//var inputCSV = document.createElement('input');
	 	//inputCSV.type = 'file';
		//inputCSV.accept = 'scriweb.herokuapp.com/public/simulador/Elevador/Elevador.CSV';
		var file = 'https://scriweb.herokuapp.com/public/scriweb/simulador/Elevador/Elevador.cvs';
		//inputCSV.click();
		//inputCSV.onchange = function() {
	    	//	var file = this.files[0];
			pegaCSV(file);
		//	simPath = simPathInicial + file.name.slice(0,file.name.length -4) + '/';
		//};
		//let a = document.createElement('a');
		//a.href = item.url;
		//a.download = item.url.split('/').pop();
		//document.body.appendChild(a);
		//a.click();
		//document.body.removeChild(a);
		//var file = this.files[0];
		//leitorDeCSV.readAsText(file);
		comandos=0;		
		valor_chave[4]=0;
		valor_chave[5]=1;
	}
	if (simEdicao==0 && valor_chave[1]==1){
		valor_chave[1]=0;
		comandos = 0;
		simEdicao = 1;
	}
	if (simEdicao==1 && valor_chave[1]==1){
		valor_chave[1]=0;
		comandos = 0;
		simEdicao = 0;
	}
	if (simEdicao==1 && valor_chave[2]==1){
		comandos = 2;
	}
	if (simEdicao==1 && valor_chave[3]==1){
		simFuncao1();
	}
	if (simEdicao==1 && valor_chave[4]==1){
		simFuncao2();
	}
	if (simEdicao==1 && valor_chave[5]==1){
		simFuncao3();
	}
	if (simEdicao==1 && valor_chave[6]==1){
		simFuncao4();
	}
	if (simEdicao==1 && valor_chave[7]==1){
		simFuncao5();
	}
	if (simEdicao==1 && valor_chave[8]==1){
		simFuncao6();
	}
	if (simEdicao==1 && valor_chave[9]==1){
		simFuncao7();
	}

	draw_botoessim();		
}


//leitura de arquivos
//Fonte https://tableless.com.br/file-api-trabalhando-com-arquivos-locais-usando-javascript/
var leitorDeCSV = new FileReader();
leitorDeCSV.addEventListener('load', leCSV);


function pegaCSV(inputFile) {
	var file = inputFile.files[0];
			
	leitorDeCSV.readAsText(file);
}

function leCSV(evt) {
	var fileArr = evt.target.result.split('\n');
	draw_processo(fileArr);
}
