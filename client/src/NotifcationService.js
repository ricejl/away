import Swal from "sweetalert2";

export default class NotificationService {
  static async inputData(title = "Enter Inputs", profileData) {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html:
          `<form class="needs-validation profile-form" novalidate @change="checkStuff()">` +
          `<label class="mb-0">Full name</label>` +
          `<input id="name" class="swal2-input" value="${profileData.name || ''}" placeholder="Enter your name">` +
          `<label class="mb-0">Username</label>` +
          `<input id="username" class="swal2-input" value="${profileData.username || ''}" placeholder="Enter a display name">` +
          `<label class="mb-0">Description</label>` +
          `<input id="description" class="swal2-input" value="${profileData.description || ''}" placeholder="Enter description">` +
          `<label class="mb-0">Email</label>` +
          `<input id="email" type="email" class="swal2-input" value="${profileData.email || ''}" placeholder="Public email address">` +
          `<label class="mb-0">Image URL</label>` +
          `<input id="img-url" type="text" class="swal2-input" value="${profileData.imgURL || ''}" placeholder="Enter image URL">` +
          `</form>`,
        // NOTE for email validation look into validitystate=true, @change
        focusConfirm: false,
        preConfirm: () => {
          let name = document.getElementById("name").value;
          let username = document.getElementById("username").value;
          let description = document.getElementById("description").value;
          let email = document.getElementById("email");
          let imgURL = document.getElementById("img-url").value;
          if (!name || !username || !email.value) {
            Swal.showValidationMessage("Please fill out all fields");
          }
          if (email.validity.typeMismatch == true) {
            Swal.showValidationMessage("Invalid Email Address");
          }
          return [
            name,
            username,
            description,
            email.value,
            imgURL
          ];
        }
      });
      if (formValues) {
        return {
          name: formValues[0],
          username: formValues[1],
          description: formValues[2],
          email: formValues[3],
          imgURL: formValues[4]
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

  static async errorMessage(text = "Oops") {
    try {
      await Swal.fire({
        icon: "error",
        text
      });

    } catch (error) {
      return false
    }
  }
}
