/* jslint asi:true, browser:true */

function exportNode(node) {
    var s = "";
    var i;
    switch (node.nodeType) {

        case Node.TEXT_NODE:
            s = node.textContent.replace(/\s+/, " ");
            break;

        case Node.ELEMENT_NODE:
            for (i = 0; i < node.childNodes.length; i++) {
                s += exportNode(node.childNodes.item(i))
            }
            switch (node.tagName) {

                case "A":
                    if (node.classList.contains("export-link")) s = "";
                    else s += " [" + node.href + "]";
                    break;

                case "ASIDE":
                    s = "\n[[" + s + "]]\n";
                    break;

                case "B":
                    s = "#" + s.replace(/\s+/g, "-");
                    break;

                case "BLOCKQUOTE":
                    s = ("\n" + s.replace(/\s+$/, "").replace(/^\s+/, "")).replace(/\s*\n\s*/g, "\n").replace(/\n/g, "\n > “") + "”\n";
                    break;

                case "CODE":
                case "I":
                    s = "'" + s.trim() + "'";
                    break;

                case "DEL":
                    s = "[deleted]";
                    break;

                case "DFN":
                    s = "_" + s.trim() + "_";
                    break;

                case "DT":
                    s = "\n" + s + ": ";
                    break;

                case "EM":
                    s = "~" + s.trim() + "~";
                    break;

                case "FOOTER":
                    if (node.previousElementSibling) s = "\n❦ ~ ❦ ~ ❦\n" + s;
                    break;

                case "H1":
                    s = "\n" + s.toLocaleUpperCase() + "\n";
                    break;

                case "H2":
                    s = "\n☙ " + s + " ❧\n";
                    break;

                case "H3":
                    s = "\n> " + s + ":\n";
                    break;

                case "H4":
                    s = "\n>> " + s + ":\n";
                    break;

                case "H5":
                    s = "\n>>> " + s + ":\n";
                    break;

                case "H6":
                    s = "\n>>>> " + s + ":\n";
                    break;

                case "HEADER":
                    if (node.nextElementSibling) s += "\n❦ ~ ❦ ~ ❦\n";
                    break;

                case "HR":
                    s = "\n * * * \n";
                    break;

                case "INS":
                    s = "_" + s.replace(/\s+/g, "_") + "_";
                    break;

                case "LI":
                    if (node.parentElement.tagName === "OL") {
                        for (i = 0; i < node.parentElement.children; i++) {
                            if (node.parentElement.children.item(i) === node) break;
                        }
                        s = "\n" + i + ". " + s + "\n";
                    }
                    else s = "\n· " + s + "\n";
                    break;

                case "P":
                    s = "\n¶ " + s + "\n";
                    break;

                case "Q":
                    s = "“" + s + "”";
                    break;

                case "SMALL":
                    s = "((" + s.trim() + "))";
                    break;

                case "S":
                    s = "-" + s.replace(/\s+/, "-") + "-";
                    break;

                case "STRONG":
                    s = s.toLocaleUpperCase();
                    break;

                case "SUB":
                    s = "_[" + s.trim() + "]";
                    break;

                case "SUP":
                    s = "^[" + s.trim() + "]";
                    break;
            }
            break;

        default:
            break;

    }
    return s.replace(/ +/g, " ").replace(/ *\n */g, "\n").replace(/\n+/g, "\n");
}

function exportInit() {
    var a;
    var i;
    var j;
    var s;
    for (i = 0; i < document.getElementsByClassName("export").length; i++) {
        s = "data:text/plain;charset=utf-8," + encodeURIComponent(exportNode(document.getElementsByClassName("export").item(i)).trim());
       for (j = 0; j < document.getElementsByClassName("export").item(i).querySelectorAll("a.export-link").length; j++) {
           document.getElementsByClassName("export").item(i).querySelectorAll("a.export-link").item(j).href = s;
       }
    }
}

document.addEventListener("DOMContentLoaded", exportInit, false);
