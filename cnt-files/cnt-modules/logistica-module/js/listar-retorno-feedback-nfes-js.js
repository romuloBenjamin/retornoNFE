/*OBJ PATTERNS OF MODULE*/
var pattern_details = setRetornosNFEFeedbackPatterns();
function setRetornosNFEFeedbackPatterns() {
    var pattern_details = {};
    pattern_details.module = "logistica";
    pattern_details.folder = "core";
    pattern_details.file = "retornos-nfe";
    pattern_details.extensions = "php";
    pattern_details.swit = "listar-retornos-nfe";
    pattern_details.paginations = setPaginations(0, false);
    pattern_details.path = createRequestPath(pattern_details);
    return pattern_details;
}

/* -- TEST -- */
const feedbacksTest = [
    {
        date: "04/11/2021",
        nome: "Someone",
        content: "Content Content Content Content Content"
    },
    {
        date: "05/11/2021",
        nome: "Someone else",
        content: "MoreContent MoreContent MoreContent MoreContent MoreContent"
    }
]

list_feedback(feedbacksTest);
/* -- TEST -- */

/*List NFE feedbacks */
function list_feedback(params) {
    var feedbacks = [];
    /* Create the list item of feedbacks from the passed data */
    for (let index = 0; index < params.length; index++) {
        const feedback = params[index];
        feedbacks.push(
            "<div class=\"card text-black bg-light mb-2\">" +
                "<div class=\"card-header\"><small>" + feedback.date + " - " + feedback.nome + "</small></div>" +
                "<div class=\"card-body\"><p class=\"card-text\">" + feedback.content + "</p></div>" +
            "</div>"
            /*"<li class=\"list-group-item\">" +
                "<small>" + feedback.date + " - " + feedback.nome + "</small><br>" +
                feedback.content +
            "</li>"*/
        );
    }
    /* Insert the list with the items for display */
    document.getElementById("display-feeds").innerHTML = "<div class=\"list-group\">" + feedbacks.join("") + "</div>";
}