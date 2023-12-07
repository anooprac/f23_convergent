import {React, useState} from 'react';
import './Recommendation.css';


const Recommendations = ({ selectedPatient }) => {

    const [recommend, setRecommend] = useState(false);

  return (
    <div className='appointments'>
        <p style={{margin: '20px 20px'}}>Recommendations</p>
        <div class="horizontal-line" style={{width: '100%', marginTop: '-50px'}}></div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '150px'}}>
            {(selectedPatient.diabetesMed == 1 || selectedPatient.change == 1) && <p>Check in on the patients changed diabetes medication.</p>}
            {(selectedPatient.max_glu_serum != 'Norm') && <p>The patient's max glu serum levels were high.</p>}
            {(selectedPatient.A1Cresult != 'Norm') && <p>The patient's A1C levels were high.</p>}
            {(selectedPatient.insulin != 'No' && selectedPatient.insulin != 'Steady') && <p>The patient had changed insulin levels.</p>}
            {(selectedPatient.metformin != 'No' && selectedPatient.metformin != 'Steady') && <p>The patient had changed metformin levels.</p>}
            {(selectedPatient.diabetesMed == 0 && selectedPatient.change == 0) &&
                    (selectedPatient.max_glu_serum == 'Norm') &&
                    (selectedPatient.A1Cresult == 'Norm') &&
                    (selectedPatient.insulin == 'No' || selectedPatient.insulin == 'Steady') &&
                    (selectedPatient.metformin == 'No' || selectedPatient.metformin == 'Steady') &&
                    <p>No recommendations can be made at this time.</p>}
        </div>
        <div class="horizontal-line" style={{justifySelf: 'flex-end'}}></div>
        <div style={{height: '20px'}}></div>
    </div>
  );
};

export default Recommendations;
