let currentStep = 1;
const totalSteps = 3;

document.getElementById("next-btn").addEventListener("click", function () {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
    }
});

document.getElementById("prev-btn").addEventListener("click", function () {
    currentStep--;
    showStep(currentStep);
});

document.getElementById("submit-btn").addEventListener("click", function () {
    if (validateStep(currentStep)) {
        saveData();
        alert("Form submitted successfully!");
        clearForm();
    }
});

document.getElementById("refresh-btn").addEventListener("click", function () {
    location.reload();
});

function showStep(step) {
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step${i}`).style.display = i === step ? "block" : "none";
    }
    document.getElementById("prev-btn").style.display = step === 1 ? "none" : "inline-block";
    document.getElementById("next-btn").style.display = step === totalSteps ? "none" : "inline-block";
    document.getElementById("submit-btn").style.display = step === totalSteps ? "inline-block" : "none";
    document.getElementById("refresh-btn").style.display = step === totalSteps ? "inline-block" : "none";
    updateReview();
}

function validateStep(step) {
    const form = step === 1 ? document.getElementById("personal-details") : document.getElementById("professional-details");
    return form.checkValidity();
}

function updateReview() {
    if (currentStep === totalSteps) {
        const review = document.getElementById("review");
        review.innerHTML = `
            <h3>Personal Details</h3>
            <p>Full Name: ${document.getElementById("fullname").value}</p>
            <p>Email: ${document.getElementById("email").value}</p>
            <p>Phone: ${document.getElementById("phone").value}</p>
            <p>Gender: ${document.querySelector('input[name="gender"]:checked').value}</p>
            <p>Age: ${document.getElementById("age").value}</p>
            <h3>Professional Details</h3>
            <p>Education: ${document.getElementById("education").value}</p>
            <p>Skills: ${Array.from(document.querySelectorAll('.skills input:checked')).map(el => el.value).join(", ")}</p>
            <p>Experience: ${document.getElementById("experience").value}</p>
            <p>Current Role: ${document.getElementById("current-role").value}</p>
        `;
    }
}

function saveData() {
    const data = {
        fullName: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        age: document.getElementById("age").value,
        education: document.getElementById("education").value,
        skills: Array.from(document.querySelectorAll('.skills input:checked')).map(el => el.value),
        experience: document.getElementById("experience").value,
        currentRole: document.getElementById("current-role").value,
    };
    localStorage.setItem("formData", JSON.stringify(data));
}

function clearForm() {
    document.getElementById("personal-details").reset();
    document.getElementById("professional-details").reset();
    localStorage.removeItem("formData");
}

function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
        document.getElementById("fullname").value = savedData.fullName;
        document.getElementById("email").value = savedData.email;
        document.getElementById("phone").value = savedData.phone;
        document.querySelector(`input[name="gender"][value="${savedData.gender}"]`).checked = true;
        document.getElementById("age").value = savedData.age;
        document.getElementById("education").value = savedData.education;
        savedData.skills.forEach(skill => {
            document.querySelector(`.skills input[value="${skill}"]`).checked = true;
        });
        document.getElementById("experience").value = savedData.experience;
        document.getElementById("current-role").value = savedData.currentRole;
    }
}

window.onload = function () {
    showStep(currentStep);
    loadSavedData();
};
