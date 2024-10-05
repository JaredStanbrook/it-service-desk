"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const rockerSwitch = new RockerSwitch("#clocked_in_switch");
    const input = document.getElementById("student_id");
    input.addEventListener("input", async () => {
        const response = await fetch("/clockreg/" + input.value, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Staff Not Found!");
        }
        const data = await response.json();
        rockerSwitch.clockReg = data.clockstate.clocked_in ? "in" : "out";
    });
});
class RockerSwitch {
    /**
     * @param buttonEl CSS selector of the button to use
     */
    constructor(buttonEl) {
        var _a;

        this.button = document.querySelector(buttonEl);
        // Set the initial value of clockReg based on the button's aria-labelledby attribute
        this._clockReg =
            (_a = this.button) === null || _a === void 0
                ? "out" // default value if aria-labelledby is not present
                : this.button.getAttribute("aria-labelledby") || "out"; // preloaded value from aria-labelledby

        // Set the aria-labelledby attribute to reflect the initial state
        if (this.button) {
            this.button.setAttribute("aria-labelledby", this._clockReg);
        }

        // Attach event listener to toggle on click
        (_a = this.button) === null || _a === void 0
            ? void 0
            : _a.addEventListener("click", this.clockRegToggle.bind(this));
    }
    get clockReg() {
        return this._clockReg;
    }
    set clockReg(value) {
        var _a;
        this._clockReg = value;
        (_a = this.button) === null || _a === void 0
            ? void 0
            : _a.setAttribute("aria-labelledby", this._clockReg);
    }
    async handleSubmit(value) {
        try {
            const formData = new FormData();
            formData.set("staff_id", document.getElementById("student_id").value);
            formData.set("clocked_in", value === "in");
            await fetch("/clockin", {
                method: "POST",
                body: formData,
            });
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    }
    /** Set the temperature scale to °C or °F. */
    clockRegToggle() {
        this.clockReg = this.clockReg === "in" ? "out" : "in";
        this.handleSubmit(this.clockReg);
    }
}
