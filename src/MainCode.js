function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}



var sheetId = "10-tbFNXQOT0YAEasjXnrQNPnMuLkVCYc9xXvhAg3abg"; // ID da sua planilha
var sheetName = "Personagem"; // Nome da aba



function pegarValoresAtributos() {
  var rangeA1 = "A:B";
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var range = sheet.getRange(rangeA1);
  var values = range.getValues();
  var atributos = {};

  // Lista original dos nomes dos atributos
  var atributosProcurados = ['metal', 'agua', 'fogo', 'madeira', 'terra', 'pontos disponiveis'];

  for (var i = 0; i < values.length; i++) {
    var nomeAtributoOriginal = values[i][0].toLowerCase();
    var valorAtributo = values[i][1];

    if (atributosProcurados.includes(nomeAtributoOriginal)) {
      // Converte o nome do atributo para camelCase e usa como chave no objeto
      var nomeAtributoCamelCase = toCamelCase(nomeAtributoOriginal);
      atributos[nomeAtributoCamelCase] = valorAtributo;
    }
  }

  return atributos;
}

// Função auxiliar para converter strings para camelCase
function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function salvarDadosNaPlanilha(dados) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

  // Supondo que os nomes dos atributos estão na coluna A e seus valores na coluna B
  var range = sheet.getRange("A1:B");
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
      var atributo = values[i][0].toLowerCase();
      if (dados.hasOwnProperty(atributo)) {
          sheet.getRange(i + 1, 2).setValue(dados[atributo]);
      }
  }
}