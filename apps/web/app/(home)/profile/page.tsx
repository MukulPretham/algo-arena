import { getServerSession } from 'next-auth';
import React from 'react'

const page = async() => {
    const params = await getServerSession();
    console.log(params);

    return (
        <div className="profile-container">
            <h1 className="profile-name">John Doe</h1>
            <p className="profile-email">Email: john.doe@example.com</p>

            <div className="submissions-section">
                <h2 className="submissions-title">Submissions</h2>
                <ul className="submissions-list">
                    <li className="submission-item">
                        <p className="submission-title">Submission 1</p>
                        <p className="submission-date">Submitted on: 2025-05-01</p>
                    </li>
                    <li className="submission-item">
                        <p className="submission-title">Submission 2</p>
                        <p className="submission-date">Submitted on: 2025-05-02</p>
                    </li>
                    <li className="submission-item">
                        <p className="submission-title">Submission 3</p>
                        <p className="submission-date">Submitted on: 2025-05-03</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default page