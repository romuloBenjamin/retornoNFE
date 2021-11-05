document.querySelector("button#novo-registro").addEventListener("click", command_go_to);
function command_go_to() {
    var toCamels = camel_case(this.id);
    pushPage(toCamels);
}