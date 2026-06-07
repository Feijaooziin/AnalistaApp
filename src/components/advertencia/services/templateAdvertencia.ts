import { AdvertenciaData } from "../types/advertencia";

export function gerarHtmlAdvertencia(
  data: AdvertenciaData,
  logoBase64: string,
) {
  const funcionario = data.funcionario.trim().toUpperCase();

  const cidade = (data.cidade || "Pinhais").trim().toUpperCase();

  const isAdvertencia = data.tipoDocumento === "ADVERTENCIA";

  const documento = isAdvertencia
    ? "ADVERTÊNCIA DISCIPLINAR"
    : "SUSPENSÃO DISCIPLINAR";

  const medida = isAdvertencia ? "advertência" : "suspensão";

  const admissao = data.admissao
    ? data.admissao.toLocaleDateString("pt-BR")
    : "";

  const dataOcorrido = data.dataOcorrido.toLocaleDateString("pt-BR");

  const dataAssinatura = data.dataAssinatura.toLocaleDateString("pt-BR");

  const motivosHtml = data.motivos
    .map((motivo) => `<li>${motivo}</li>`)
    .join("");

  const motivosTexto = data.motivos.join(", ");

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />

        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            padding: 15px;
          }

          .container {
            border: 1.5px solid #000;
            padding: 12px;
            min-height: 95vh;
            position: relative;
            box-sizing: border-box;
          }

          .conteudo {
            min-height: 620px;
          }

          .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .header-table td {
            border: 1px solid #000;
          }

          .logo-cell {
            width: 240px;
            height: 80px;
            text-align: center;
            vertical-align: middle;
          }

          .logo-img {
            width: 220px;
            height: auto;
            display: block;
            margin: 0 auto;
          }

          .title-cell {
            text-align: center;
            font-size: 18pt;
            font-weight: bold;
          }

          .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
          }

          .table td {
            padding: 4px 6px;
            font-size: 12pt;
          }

          .label {
            width: 75px;
            font-weight: bold;
          }

          .box {
            margin-top: 16px;
            text-align: justify;
            line-height: 1.5;
            font-size: 12pt;
          }

          .assinaturas {
            margin-top: 60px;
            display: table;
            width: 100%;
          }

          .assinatura {
            display: table-cell;
            width: 50%;
            text-align: center;
            vertical-align: top;
          }

          .linha {
            border-top: 1px solid #000;
            width: 85%;
            margin: 0 auto 4px auto;
          }

          .nome-assinatura {
            padding: 4px;
            font-weight: bold;
            font-size: 12pt;
          }

          .cargo-assinatura {
            padding: 4px;
            font-size: 12pt;
          }

          .testemunhas-table {
            margin-top: 80px;
            width: 100%;
            border-collapse: collapse;
          }

          .testemunhas-table td {
            width: 50%;
            text-align: center;
            vertical-align: top;
          }

          .lgpd {
            position: absolute;
            left: 12px;
            right: 12px;
            bottom: 12px;
            font-size: 10pt;
            text-align: justify;
            line-height: 1.3;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="conteudo">

            <table class="header-table">
              <tr>
                <td class="logo-cell">
                  <img
                    src="${logoBase64}"
                    class="logo-img"
                    alt="Logo"
                  />
                </td>

                <td class="title-cell">
                  ${documento}
                </td>
              </tr>
            </table>

            <table class="table">
              <tr>
                <td class="label">
                  EMPREGADOR:
                </td>

                <td style="font-weight: bold">
                  COMFRIO TRANSPORTES EIRELI
                </td>
              </tr>

              <tr>
                <td class="label">
                  FUNCIONÁRIO:
                </td>

                <td style="font-weight: bold">
                  ${funcionario}
                </td>
              </tr>

              <tr>
                <td class="label">
                  ADMISSÃO:
                </td>

                <td>
                  ${admissao}
                </td>
              </tr>
            </table>

            <div
              class="box"
              style="margin-top: 50px;"
            >
              Na conformidade da Consolidação das Leis do Trabalho,
              fica aderida a ${medida}
              pela falta abaixo discriminada:
            </div>

            <div class="box">
              <strong>Motivos:</strong>

              <ul style="margin-top: 8px;">
                ${motivosHtml}
              </ul>
            </div>

            <div class="box">
              Em face de seu proceder, neste momento estamos lhe aplicando a
              ${data.numeroAdvertencia}ª ${medida}
              em razão de:

              ${motivosTexto}.

              Referente ao ocorrido em
              ${dataOcorrido}.
            </div>

            <div class="box">
              A presente medida tem por finalidade orientá-lo
              quanto ao cumprimento das normas internas da empresa,
              ficando ciente de que a repetição de procedimentos
              semelhantes poderá acarretar medidas disciplinares
              mais severas, inclusive dispensa por justa causa,
              nos termos da legislação trabalhista vigente.
            </div>

            <p style="margin-top: 30px;">
              Favor dar seu ciente na cópia desta.
              <br />

              ${cidade},
              ${dataAssinatura}
            </p>

          </div>

          <div class="assinaturas">

            <div class="assinatura">
              <div class="linha"></div>

              <div class="nome-assinatura">
                COMFRIO TRANSPORTES EIRELI
              </div>

              <div class="cargo-assinatura">
                EMPREGADOR
              </div>
            </div>

            <div class="assinatura">
              <div class="linha"></div>

              <div class="nome-assinatura">
                ${funcionario}
              </div>

              <div class="cargo-assinatura">
                EMPREGADO
              </div>
            </div>

          </div>

          <table class="testemunhas-table">
            <tr>
              <td>
                <div class="linha"></div>

                <p>TESTEMUNHA</p>
              </td>

              <td>
                <div class="linha"></div>

                <p>TESTEMUNHA</p>
              </td>
            </tr>
          </table>

          <div class="lgpd">
            Nós da COMFRIO valorizamos a privacidade e a
            proteção dos seus dados pessoais. As informações
            contidas neste documento serão utilizadas
            exclusivamente para fins de registro e aplicação
            da medida disciplinar, observando os princípios
            estabelecidos pela Lei Geral de Proteção de Dados
            Pessoais (LGPD).
          </div>

        </div>
      </body>
    </html>
  `;
}
