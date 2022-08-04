export const copy = (data: string) => {
  const copyText = document.createElement("input");
  copyText.value = data;
  document.body.appendChild(copyText);

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
  //document.body.removeChild(copyText)
  //navigator.clipboard.writeText(data)
};
