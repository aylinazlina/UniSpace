import React from 'react'

const Routine = () => {
  return (
    <div>
     <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header">
                <h4 className="mb-0">Routine</h4>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" className="text-center">Day</th>
                                <th scope="col" className="text-center">Start Time</th>
                                <th scope="col" className="text-center">End Time</th>
                                <th scope="col" className="text-center">Subject/Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            {% for re in rn %}
                            <tr>
                                <td className="text-center align-middle font-weight-bold">{{ re.day }}</td>
                                <td className="text-center align-middle">{{ re.start_time|time:"g:i A" }}</td>
                                <td className="text-center align-middle">{{ re.end_time|time:"g:i A" }}</td>
                                <td className="text-center align-middle">{{ re.subject_or_purpose }}</td>
                            </tr>
                            {% endfor %}
                            {% if not rn %}
                            <tr>
                                <td colspan="4" className="no-data">No routine available.</td>
                            </tr>
                            {% endif %}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Routine
