function Enviar(){
	clp_programa = booleano;
	clp_cria_memoria();
}

function Envia_Entrada_Ele(data){
	while (data.length < clpI.length) {
		data[(clpI.length)-1] = clpI[(clpI.length)-1];
	}
	if (Tela_Eletrico_Simulador == 0) {
		clpI = data; 
		sim_I = clpI;
	}
}

function Envia_Entrada_S(data){
	while (data.length < clpI.length) {
		data[(clpI.length)-1] = clpI[(clpI.length)-1];
	};
	if (Tela_Eletrico_Simulador==1) {
		clpI = data;
		real_I = clpI;
	}
}

function Envia_Memoria_S(data){
  	clpM[data.substr(1)] = Sim_enderecoCT(data,0);
}
