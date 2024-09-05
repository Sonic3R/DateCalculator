function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

$(function () {
  $("[name='dt']").on("input", function (e) {
    var val = $(this).val();

    try {
      var result = /^(\w{3})\.\s*(\d{2})\,\s*(\d{4})\s*\-\s*(\d{2}):(\d{2}):(\d{2})(\s*GMT)?$/.exec(val);

      if (result && result != null && result.length >= 6) {
        var str = result[2] + " " + result[1] + " " + result[3] + " " + result[4] + ":" + result[5] + ":" + result[6];
        if (val.indexOf("GMT") == -1) {
          str = str + " GMT";
        } else {
          str = str + result[7];
        }

        var dt = Date.parse(str);
        $(".result").val(dt / 1000);
      }
    } catch {

    }
  });

  $("button").on("click", function () {
    copyTextToClipboard($(".result").val());
  });
});