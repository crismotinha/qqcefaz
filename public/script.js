// $("#form-cadastro").on("submit", e => {
//   e.preventDefault();

//   $.ajax({
//     type: "POST",
//     url: "/usuario/cadastrO",
//     data: $("form-cadastro").serialize()
//   }).done();
// });

// $("#cadastro-email").focusout(() => {
//   let valor = $("#cadastro-email").val();

//   $.ajax({
//     type: "POST",
//     url: "usuario/emailexiste",
//     data: { email: $("#cadastro-email").val }
//   }).done(d => {
//     if (!d.existe) {
//       Swal("Email já existe.");
//     }
//   });
// });
