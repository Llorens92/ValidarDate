function Validar() {
    var correcto = false;
    if (ValidarNIF() && ValidarNomyApe(1) && ValidarNomyApe(2))
        if (ValidarPass() && ValidarEmail()) {
            correcto = ValidarNotEmpty();
        } else {
            ValidarNotEmpty();
        }
    return correcto;
}
function ValidarNomyApe(num) {
    var value = document.getElementsByTagName("input")[num].value;
    var correcto = false;
    var salir = false;
    if (value.length > 0) {
        var expreg = /^([A-Z]|[a-z])/;
        for (var i = 0; i < value.length && !salir; i++) {
            if (expreg.test(value[i])) {
                correcto = true;
            } else {
                correcto = false;
                salir = true;
            }
        }
        if (!correcto)
            alert("El nombre y los apellidos deben estar compuestos solo por letras");
    } else {
        correcto = true;
    }
    return correcto;
}

function ValidarPass() {
    var value = document.getElementsByTagName("input")[5].value;
    var correcto = false;
    if (value.length === 0) {
        correcto = true;
    } else {
        var expreg = /[A-Za-z]+([0-9]+)|([0-9]+[A-Za-z]+)/;
        if (value.length < 2) {
            document.getElementsByTagName("span")[1].setAttribute("class", "glyphicon glyphicon-remove text-danger");
        } else {
            if (expreg.test(value)) {
                document.getElementsByTagName("span")[1].setAttribute("class", "glyphicon glyphicon-ok text-success");
                correcto = true;
            } else {
                document.getElementsByTagName("span")[1].setAttribute("class", "glyphicon glyphicon-remove text-danger");
            }
        }
    }

    return correcto;
}
function ValidarEmail() {
    var value = document.getElementsByTagName("input")[4].value;
    var correcto = false;
    if (value.length === 0) {
        correcto = true;
    } else {
        var expreg = /^([A-Za-z0-9]+([.|_|-][A-Za-z0-9]+)?@[A-Za-z]+.[A-Za-z]+)$/;
        if (expreg.test(value)) {
            document.getElementsByTagName("span")[0].setAttribute("class", "glyphicon glyphicon-ok text-success");
            correcto = true;
        } else {
            document.getElementsByTagName("span")[0].setAttribute("class", "glyphicon glyphicon-remove text-danger");
        }
    }
    return correcto;
}

function ValidarNIF() {
    return (ValidarNotEmptyNif() && Validar9Digitos() && ValidarNoEspacios() && Validar8PrimDig());
}

function Validar8PrimDig() {
    var nif = document.getElementsByTagName("input")[0].value;
    var nums = document.getElementsByTagName("input")[0].value.substring(0, 8);
    var letra = nif.substring(8, 9);
    var resto = nums % 23;
    var correcto = false;
    var expreg2 = /(^[0-9]{8}$)/;
    if (expreg2.test(nums)) {
        correcto = true;
    }
    if (!correcto) {
        alert("Los 8 primeros caracteres del NIF deben ser números");
    } else {
        var expreg = /^([A-Z]|[a-z])/;
        if (expreg.test(letra)) {
            correcto = true;
        }
        var letrasValidas = ["t", "r", "w", "a", "g", "m", "y", "f", "p", "d", "x", "b", "n", "j", "z", "s", "q", "v", "h", "l", "c", "k", "e", "t"];
        if (letrasValidas[resto] === letra.toLowerCase()) {
            correcto = true;
        } else {
            correcto = false;
        }
        if (!correcto) {
            alert("La letra del NIF no es correcta");
        }
    }
    return correcto;
}

function ValidarNotEmpty() {
    var emptys = false;
    var radio = false;
    var contadorChecks = 0;
    var form = document.forms[0];
    for (var i = 1; i < form.length - 1 && !emptys; i++) {
        if (form.elements[i].value.length === 0) {
            alert("No ha rellenado el campo " + form.elements[i].name);
            emptys = true;
        }
        if (form.elements[i].type === "radio" && form.elements[i].name === "Sexo" && !radio) {
            if (form.elements[i].checked) {
                radio = true;
                contadorChecks++;
            }
        }
    }
    var final = false;
    if (contadorChecks !== 1 && !emptys)
        alert("Debe escoger una opcion en el campo Sexo");
    else if (!emptys)
        final = true;
    return final;
}
function ValidarNotEmptyNif() {
    var correcto = false;
    var nif = document.getElementsByTagName("input")[0].value;
    if (nif.length === 0) {
        alert("No ha rellenado el campo NIF");
        correcto = true;
    }
    return !correcto;
}


function ValidarNoEspacios() {
    var nums = document.getElementsByTagName("input")[0].value;
    var array = nums.split(" ");
    var hayEspacios = false;
    if (array.length > 1)
        hayEspacios = true;
    if (hayEspacios) {
        alert("Ha introducido espacios en blanco");
    }
    return !hayEspacios;
}

function Validar9Digitos() {
    var nums = document.getElementsByTagName("input")[0].value;
    var array = nums.split("");
    var NueveDig = true;
    if (array.length !== 9)
        NueveDig = false;
    if (!NueveDig) {
        alert("Debe introducir 9 dígitos");
    }
    return NueveDig;
}

function ValidarDate() {
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    var numDias;
    if (mm === 1 || mm === 3 || mm === 5 || mm === 7 || mm === 8 || mm === 10 || mm === 12) {
        numDias=31;
    } else if (mm === 2) {        
        numDias=28;
    } else {        
        numDias=30;
    }
    document.write("<select>");
    for (var i = 0; i < numDias; i++) {
        if (dd=== (i+1)) {
            document.write("<option selected value=" + (i+1) + ">" + (i+1) + "</option>");
        } else {
            document.write("<option value=" + (i+1) + ">" + (i+1) + "</option>");
        }
    }
    document.write("</select>");
    mm = meses[mm];
    document.write("<select>");
    for (var i = 0; i < 12; i++) {
        if (mm === meses[i]) {
            document.write("<option selected value=" + meses[i] + ">" + meses[i] + "</option>");
        } else {
            document.write("<option value=" + meses[i] + ">" + meses[i] + "</option>");
        }
    }
    document.write("</select>");
    document.write("<select>");
    for (var i = 1916; i < 2036; i++) {
        if (yyyy === i) {
            document.write("<option selected value=" + i + ">" + i + "</option>");
        } else {
            document.write("<option value=" + i + ">" + i + "</option>");
        }
    }
    document.write("</select>");
}


