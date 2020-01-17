import Swal from "sweetalert2";

export default class NotificationService {
  static async inputData(title = "Enter Inputs") {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html:
          '<form class="needs-validation" novalidate @change="checkStuff()">' +
          '<label for="name">Full name</label>' +
          '<input id="name" class="swal2-input" placeholder="Enter your name">' +
          '<div class="valid-feedback">Looks good!</div>' +
          '<label for="username">Username (this will be public)</label>' +
          '<input id="username" class="swal2-input" placeholder="Enter a display name">' +
          '<div class="valid-feedback">Looks good!</div>' +
          '<label for="email">Email</label>' +
          '<input id="email" type="email" class="swal2-input" placeholder="Public email address">' +
          "</form>",
        // NOTE for email validation look into validitystate=true, @change
        focusConfirm: false,
        preConfirm: () => {
          let name = document.getElementById("name").value;
          let username = document.getElementById("username").value;
          let email = document.getElementById("email");
          if (!name || !username || !email.value) {
            Swal.showValidationMessage("Please fill out all fields");
          }
          if (email.validity.typeMismatch == true) {
            Swal.showValidationMessage("Invalid Email Address");
          }
          return [
            document.getElementById("name").value,
            document.getElementById("username").value,
            document.getElementById("email").value
          ];
        }
      });
      if (formValues) {
        return {
          name: formValues[0],
          username: formValues[1],
          email: formValues[2]
        };
      }
    } catch (error) {
      return false;
    }
  }
  static async inputList(title = "Enter Inputs") {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html: '<input id="swal-input1" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("swal-input1").value];
        }
      });
      if (formValues) {
        return formValues[0];
      }
    } catch (error) {
      return false;
    }
  }
}
