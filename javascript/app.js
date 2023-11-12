let webstore = new Vue({
  el: "#app",
  data: {
    sitename: " After Classes Depot",
    showsubject: true,
    sortAttribute: "Price",
    sortOrder: "asc", //Default
    sortingMessage: "Items currently sorted by Price in Ascending order",
    searchText: "",
    showMessage: false,
    isFormValid: false,
    states: ["Alabama", "Alaska", "Arizonz", "California", "Newvada"],
    order: {
      firstName: "",
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
      phoneNumberValid: true,
    },

    errorMessages: {
      firstName: "",
      PhoneNumber: "",
    },
    firstNameValid: true,
    phoneNumberValid: true,

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
    updateSortingMessage() {
      const criteria =
        this.sortAttribute.charAt(0).toUpperCase() + this.sortAttribute.slice(1);
      const order = this.sortOrder === "asc" ? "Ascending" : "Descending";
      this.sortingMessage = `Items currently sorted by ${criteria} in ${order} order`;
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
      this.updateFormValidation();
    },

    validatePhoneNumber() {
      if (!/^((\+44)|(0)) ?\d{4} ?\d{6}$/.test(this.order.PhoneNumber)) {
        this.errorMessages.PhoneNumber =
          "Please enter phone number in UK Format, starts with 0 or +44.";
        this.phoneNumberValid = false;
      } else {
        this.errorMessages.PhoneNumber = "";
        this.phoneNumberValid = true;
      }
      this.updateFormValidation();
    },

    updateFormValidation() {
      this.isFormValid =
        this.firstNameValid &&
        this.phoneNumberValid &&
        this.order.firstName &&
        this.order.PhoneNumber;
    },


    submitForm() {
      if (this.isFormValid) {
        alert("Order Submitted!");
        // Reset the cart and order form data
        this.cart = [];
        this.order = {
          firstName: "",
          PhoneNumber: "",
          address: "",
          city: "",
          zip: "",
          state: "",
          method: "",
          sendGift: "Send as a gift",
          dontSendGift: "Do not send as a Gift",
          firstNameValid: true,
          phoneNumberValid: true,
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
          case "Price":
            return subjects.sort((a, b) => a.Price - b.Price);
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
            return subjects.sort((a, b) => b.Price - a.Price);
          case "availableInventory":
            return subjects.sort(
              (a, b) => b.availableInventory - a.availableInventory
            );
          default:
            return subjects;
        }
      }
    },

    // cartSubjects: function () {
    //   return this.cart.map((itemId) => {
    //     const subject = this.subject.find((subject) => subject.id === itemId);
    //     return {
    //       ...subject,
    //       spaces: subject.availableInventory - this.cartCount(subject.id),
    //     };
    //   });
    // },


    cartSubjects: function () {
      const selectedCounts = {};

      // Count the occurrences of each subject in the cart
      this.cart.forEach((itemId) => {
        selectedCounts[itemId] = (selectedCounts[itemId] || 0) + 1;
      });

      // Create an array of unique subjects with their counts
      const uniqueSubjects = [...new Set(this.cart)];

      // Map the unique subjects to include count information
      return uniqueSubjects.map((itemId) => {
        const subject = this.subject.find((subject) => subject.id === itemId);
        const selectedCount = selectedCounts[itemId] || 0;
        return {
          ...subject,
          spaces: subject.availableInventory - this.cartCount(subject.id),
          selectedCount: selectedCount,
        };
      });
    },

  },
});
