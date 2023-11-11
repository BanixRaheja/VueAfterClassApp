let webstore = new Vue({
  el: "#app",
  data: {
    sitename: "Vue.js After Classes Depot",
    showsubject: true,
    sortAttribute: "subject",
    sortOrder: "asc", //Default
    searchText: "",
    showMessage: false,
    message: "Cart is Empty, Add items to view your page",
    states: ["Alabama", "Alaska", "Arizonz", "California", "Newvada"],
    order: {
      firstName: "",
      lastName: "",
      PhoneNumber: "",
      address: "",
      city: "",
      zip: "",
      state: "",
      // lert
      method: "",
      sendGift: "Send as a gift",
      dontSendGift: "Do not send as a Gift",
      firstNameValid: true,
      lastNameValid: true,
      phoneNumberValid: true,
      cityValid: true,
    },

    errorMessages: {
      firstName: "",
      lastName: "",
      PhoneNumber: "",
      city: "",
    },
    firstNameValid: true,
    lastNameValid: true,
    phoneNumberValid: true,
    cityValid: true,

    subject: lesson,
    cart: [], //array to store items in shopping cart
  },
  methods: {
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart, length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
    addToCart: function (subject) {
      if (subject.availableInventory > 0) {
        this.cart.push(subject.id);
        subject.availableInventory--;

        //update itemsLeft property
        subject.itemsLeft = subject.availableInventory;
      }
    },

    returnToMainScreen() {
      this.showsubject = true; // Set showsubject to true to display the main screen
      this.cart = []; // Clear the cart
      // this.resetOrder(); // Reset the order
    },

    showCheckout: function () {
      if (this.cart.length === 0) {
        console.log("Show checkout clicked with empty cart");
        this.showMessage = true;
      } else {
        console.log("Show checkout clicked with items in cart");
        this.showsubject = !this.showsubject;
      }
    },
    removeSubjectFromCart(subjectId) {
      const index = this.cart.findIndex((itemId) => itemId === subjectId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        const subject = this.subject.find((item) => item.id === subjectId);
        if (subject) {
          subject.availableInventory++;
        }
        if (this.cart.length === 0) {
          this.showsubject = true;
        }
      }
    },
    addToCartFromCheckout(subjectId) {
      const subject = this.subject.find((item) => item.id === subjectId);
      if (subject && subject.availableInventory > 0) {
        this.cart.push(subject.id);
        subject.availableInventory--;
      }
    },

    validateFirstName() {
      if (!/^[A-Za-z]+$/.test(this.order.firstName)) {
        this.errorMessages.firstName = "Please enter letters only";
        this.firstNameValid = false;
      } else {
        this.errorMessages.firstName = "";
        this.firstNameValid = true;
      }
    },

    validateLastName() {
      if (!/^[A-Za-z]+$/.test(this.order.lastName)) {
        this.errorMessages.lastName = "Please enter letters only";
        this.lastNameValid = false;
      } else {
        this.errorMessages.lastName = "";
        this.lastNameValid = true;
      }
    },

    validatePhoneNumber() {
      if (!/^[0-9]+$/.test(this.order.PhoneNumber)) {
        this.errorMessages.PhoneNumber =
          "Please enter numbers only for the phone number.";
        this.phoneNumberValid = false;
      } else {
        this.errorMessages.PhoneNumber = "";
        this.phoneNumberValid = true;
      }
    },

    validateCity() {
      if (!/^[A-Za-z]+$/.test(this.order.city)) {
        this.errorMessages.city = "Please enter letters only";
        this.cityValid = false;
      } else {
        this.errorMessages.city = "";
        this.cityValid = true;
      }
    },

    submitForm() {
      if (
        this.firstNameValid &&
        this.lastNameValid &&
        this.phoneNumberValid &&
        this.cityValid &&
        this.order.firstName &&
        this.order.lastName &&
        this.order.PhoneNumber &&
        this.order.city
      ) {
        alert("Order Submitted!");
        // Reset the cart and order form data
        this.cart = [];
        this.order = {
          firstName: "",
          lastName: "",
          PhoneNumber: "",
          address: "",
          city: "",
          zip: "",
          state: "",
          method: "",
          sendGift: "Send as a gift",
          dontSendGift: "Do not send as a Gift",
          firstNameValid: true,
          lastNameValid: true,
          phoneNumberValid: true,
          cityValid: true,
        };
        this.showsubject = true;
        for (let i = 0; i < this.subject.length; i++) {
          this.subject[i].availableInventory = 5;
        }
      } else {
        alert("Please fill in all fields correctly.");
      }
    },
  },

  computed: {
    cartItemCount: function () {
      console.log("works");
      return this.cart.length;
    },

    canAddToCart() {
      return (subject) => {
        // return subject.availableInventory > 0;
        return subject.availableInventory > this.cartCount(subject.id);
      };
    },
    sortedSubjects: function () {
      const subjects = this.subject.filter(
        (subject) =>
          subject.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          subject.location.toLowerCase().includes(this.searchText.toLowerCase())
      );

      if (this.sortOrder === "asc") {
        // Ascending order
        switch (this.sortAttribute) {
          case "name":
            return subjects.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            });
          case "location":
            return subjects.sort((a, b) => {
              if (a.location.toLowerCase() > b.location.toLowerCase()) return 1;
              if (a.location.toLowerCase() < b.location.toLowerCase())
                return -1;
              return 0;
            });
          case "price":
            return subjects.sort((a, b) => a.price - b.price);
          case "availableInventory":
            return subjects.sort(
              (a, b) => a.availableInventory - b.availableInventory
            );
          default:
            return subjects;
        }
      } else if (this.sortOrder === "desc") {
        // Descending order
        switch (this.sortAttribute) {
          case "name":
            return subjects.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });
          case "location":
            return subjects.sort((a, b) => {
              if (a.location.toLowerCase() > b.location.toLowerCase())
                return -1;
              if (a.location.toLowerCase() < b.location.toLowerCase()) return 1;
              return 0;
            });
          case "price":
            return subjects.sort((a, b) => b.price - a.price);
          case "availableInventory":
            return subjects.sort(
              (a, b) => b.availableInventory - a.availableInventory
            );
          default:
            return subjects;
        }
      }
    },

    cartSubjects: function () {
      return this.cart.map((itemId) => {
        const subject = this.subject.find((subject) => subject.id === itemId);
        return subject;
      });
    },
  },
});
