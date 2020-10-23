const userOperations = {

    checkName(name, id) {
        if (this.checkLength(name, 5, 25)) {
            document.querySelector("#" + id).innerHTML = "Should be between 5-25 characters";
        } else {
            if (!this.alphanumeric(name)) {
                document.querySelector("#" + id).innerHTML = "Should contains only alphabet";
            } else {
                document.querySelector("#" + id).innerHTML = " ";
            }
        }
    },

    applyClass(border, classborder, hpassword, hclasspassword, show) {
        hpassword.className = hclasspassword;
        border.className = classborder;
        hpassword.innerHTML = show;
    },

    checkLength(name, minlength, maxlength) {
        if (name.length < minlength || name.length > maxlength) {
            return true;
        } else {
            return false;
        }
    },

    alphanumeric(value) {
        var alphabets = /^[a-zA-Z]+$/;
        if (!value.match(alphabets)) {
            return false;
        } else {
            return true;
        }
    }
}