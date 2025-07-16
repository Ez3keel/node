

// Conectando streams com node e pipe

//  Stream Readable
//  stdin está lendo e stdout está escrevendo
// process.stdin
//     .pipe(process.stdout)

import { stdout } from 'node:process';
import { Readable, Writable, Transform} from 'node:stream'

class OneToHundreadStream extends Readable {
    index = 1;

    _read() {
       const i = this.index++ 

       setTimeout(() => {
            if(i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
       },1000)
        
       
    }
}

// chunk é o pedaço que estou enviando dentro do push no caso é o buf
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        // Envio nulo caso de erro
        callback(null, Buffer.from(String(transformed)))
    }
}

/*
    Buffer é uma forma de transicionar dados entre Streams
*/

// Stream de Leitura OneToHundreadStream = Readable / Só lê dados
// Stream de escrita MultiplyByTenStream = Writable / Só escreve dados
// Stream de Transformação InverseNumber = Transform / Obrigátoriamente precisa ler os dados e escrever em outro lugar
    new OneToHundreadStream()
        .pipe(new InverseNumber())
        .pipe(new MultiplyByTenStream())




// Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000 de linhas do arquivo
// vai ser enviado 
//  POST /upload import.csv

// 10mb/s - 100s

// 100s -> Inserções no banco de dados

//  10 mb/s -> 10.000
//  Se ele sobe 10 mb/s em 100s eu já posso ir enviando para o banco de dados

// Readable Streams / Writable Streams


/*
    Streams? O que são?

    São interfaces para trabalhar com fluxos contínuos de dados.
    Imagine um arquivo muito grande ou uma transmissão de vídeo: em vez de carregar tudo de uma vez (o que consome muita memória), você vai processando aos poucos, em partes (chamadas de chunks).

    No node.js existem principalmente quatro tipos de streams:
    Readable: você lê dados dele.
    Writable: você escreve dados nele.
    Duplex: pode ser lido e escrito
    Transform: parecido com Duplex, mas transforma os dados enquanto passam.

    Streams = fluxo contínuo de dados.

    Readable = você consome dados.

    Writable = você envia dados.

    Trabalham com chunks, economizando memória.

    Podem ser combinados com pipe().

    pipe é uma forma de conectar a saída (output) de um Readable Stream diretamente na entrada (input) de um Writable Stream.

    É como colocar um caninho (um pipe, em inglês) que leva o que está sendo lido de um lado e envia direto para o outro, sem precisar:

    armazenar tudo na memória;

    esperar que a leitura termine para começar a escrita.
*/