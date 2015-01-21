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
                    s += " [" + node.href + "]";
                    break;

                case "ARTICLE":
                case "FOOTER":
                case "HEADER":
                    if (node.nextSibling) s += "\n❦ ~ ❦ ~ ❦\n";
                    break;

                case "ASIDE":
                    s = "\n[[" + s + "]]\n";
                    break;

                case "B":
                    s = "#" + s.replace(/\s+/g, "-");
                    break;

                case "BLOCKQUOTE":
                    s = ("\n" + s.replace(/\n+$/, "")).replace(/\n+/g, "\n").replace(/\n/g, "\n > “") + "”\n";
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

                case "HR":
                    s = "\n * * * \n";
                    break;

                case "INS":
                    s = s.replace(/\s+/g, "_");
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

                case "SMALL":
                    s = "((" + s.trim() + "))";
                    break;

                case "S":
                    s = s.replace(/\s+/, "-");
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
    return s.replace(/ +/g, " ").replace(/ ?\n ?/g, "\n").replace(/\n+/g, "\n");
}

function exportInit() {
    var exportA;
    var exportI;
    for (exportI = 0; exportI < document.getElementsByClassName("export").length; exportI++) {
        exportA = document.createElement("A");
        exportA.textContent = "Download";
        exportA.href = "data:text/plain;charset=utf-8," + encodeURIComponent(exportNode(document.getElementsByClassName("export").item(exportI)).trim());
        document.getElementsByClassName("export").item(exportI).appendChild(document.createElement("FOOTER").appendChild(exportA));
    }
}

document.addEventListener("DOMContentLoaded", exportInit, false);
