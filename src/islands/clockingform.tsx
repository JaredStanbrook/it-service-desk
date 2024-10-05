import { useState } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { ClockReg } from "../db";

const ClockInForm: FC = () => {
    return (
        <div>
            <script type="module" src="/static/clockingform.js"></script>
            <h1 className="text-5xl font-semibold text-white text-center p-4">
                Staff Clock-In Form
            </h1>
            <form method="POST">
                <div className="container">
                    <input
                        type="text"
                        name="student_id"
                        id="student_id"
                        required
                        autocomplete="off"
                        className="input"
                    />
                    <label className="floating-label">Student ID *</label>
                </div>
                <div class="switch">
                    <label className="switch__label" htmlFor="clocked_in_switch">
                        Clock In/Out
                    </label>
                    <button
                        className="switch__button"
                        type="button"
                        id="clocked_in_switch"
                        title="Clock In/Out Switch"
                        aria-labelledby="in">
                        <span class="switch__button-wrap">
                            <span class="switch__shadow"></span>
                            <span class="switch__shadow"></span>
                            <span class="switch__inner">
                                <span class="switch__options">
                                    <span
                                        id="in"
                                        className="switch__option-label"
                                        aria-hidden="true">
                                        In
                                    </span>
                                    <span className="switch__option-sep"></span>
                                    <span
                                        id="out"
                                        className="switch__option-label"
                                        aria-hidden="true">
                                        Out
                                    </span>
                                </span>
                            </span>
                        </span>
                    </button>
                </div>
            </form>
            <div className="container">
                <a href="/staff" className="bg-white py-2 px-4 rounded-md">
                    Create New Staff!
                </a>
            </div>
        </div>
    );
};

export default ClockInForm;
