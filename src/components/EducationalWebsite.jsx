import React, { useState, useEffect, useRef } from 'react';

const EducationalWebsite = () => {
  const [currentStep, setCurrentStep] = useState('start'); // 'start', 'teacher', 'student'
  const [teacherCode, setTeacherCode] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' or 'error'
  
  // Refs for auto-focus
  const teacherInputRef = useRef(null);
  const studentInputRef = useRef(null);

  // Auto-dismiss popup after 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        if (popupType === 'success') {
          // Reset the entire flow after successful code entry
          setCurrentStep('start');
          setTeacherCode('');
          setStudentCode('');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, popupType]);

  // Auto-focus when entering teacher page
  useEffect(() => {
    if (currentStep === 'teacher' && teacherInputRef.current) {
      setTimeout(() => {
        teacherInputRef.current.focus();
      }, 100);
    }
  }, [currentStep]);

  // Auto-focus when entering student page
  useEffect(() => {
    if (currentStep === 'student' && studentInputRef.current) {
      setTimeout(() => {
        studentInputRef.current.focus();
      }, 100);
    }
  }, [currentStep]);

  // Auto-focus student input when code is cleared after wrong entry
  useEffect(() => {
    if (currentStep === 'student' && studentCode === '' && studentInputRef.current && showPopup && popupType === 'error') {
      setTimeout(() => {
        studentInputRef.current.focus();
      }, 100);
    }
  }, [studentCode, currentStep, showPopup, popupType]);

  const handleStart = () => {
    setCurrentStep('teacher');
  };

  const handleTeacherCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setTeacherCode(value);
    }
  };

  const handleTeacherConfirm = () => {
    if (teacherCode.length === 6) {
      setCurrentStep('student');
    }
  };

  const handleStudentCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setStudentCode(value);
    }
  };

  const handleStudentSubmit = () => {
    if (studentCode.length === 6) {
      if (studentCode === teacherCode) {
        setPopupMessage('Code is correct! 🎉');
        setPopupType('success');
      } else {
        setPopupMessage('Code is incorrect. Please try again.');
        setPopupType('error');
        setStudentCode(''); // Clear student input for retry
      }
      setShowPopup(true);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  // Styles
  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: 'none',
    padding: '2rem',
    width: '90%',
    maxWidth: '400px'
  };

  const inputStyle = {
    width: '90%',
    padding: '1rem',
    fontSize: '1.5rem',
    fontFamily: 'monospace',
    letterSpacing: '0.5rem',
    textAlign: 'center',
    border: '2px solid #d1d5db',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s ease'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '2px solid #d1d5db'
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d1d5db',
    color: '#9ca3af',
    cursor: 'not-allowed'
  };

  const StartPage = () => (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#BBFBFF',
      padding: '1rem'
    }}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            margin: '0 auto 1rem auto',
            padding: '1rem',
            backgroundColor: '#dbeafe',
            borderRadius: '50%',
            width: '4rem',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            📚
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
            Digit Password
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Can you guess the 6-digit code?
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: '#dbeafe',
            borderRadius: '12px',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>👨‍🏫</span>
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>Teachers: Set your 6-digit code</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: '#dcfce7',
            borderRadius: '12px'
          }}>
            <span style={{ fontSize: '1.25rem' }}>👥</span>
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>Students: Enter the answer code</span>
          </div>
        </div>

        <button 
          onClick={handleStart}
          style={{
            ...primaryButtonStyle,
            padding: '1.5rem',
            fontSize: '1.125rem'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          Start Session
        </button>
      </div>
    </div>
  );

  const TeacherPage = () => (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#BBFBFF',
      padding: '1rem'
    }}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            margin: '0 auto 1rem auto',
            padding: '1rem',
            backgroundColor: '#f3e8ff',
            borderRadius: '50%',
            width: '4rem',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            👨‍🏫
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
            Teacher Setup
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Enter a 6-digit code for your students
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            color: '#374151', 
            marginBottom: '0.5rem' 
          }}>
            Enter 6-digit code:
          </label>
          <input
            ref={teacherInputRef}
            type="text"
            value={teacherCode}
            onChange={handleTeacherCodeChange}
            onKeyPress={(e) => handleKeyPress(e, handleTeacherConfirm)}
            placeholder="######"
            style={{
              ...inputStyle,
              borderColor: teacherCode ? '#7c3aed' : '#d1d5db'
            }}
            maxLength={6}
            onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
            onBlur={(e) => e.target.style.borderColor = teacherCode ? '#7c3aed' : '#d1d5db'}
            autoFocus
          />
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            marginTop: '0.25rem', 
            textAlign: 'center' 
          }}>
            {teacherCode.length}/6 digits
          </div>
        </div>

        <button 
          onClick={handleTeacherConfirm}
          disabled={teacherCode.length !== 6}
          style={teacherCode.length === 6 ? 
            { ...primaryButtonStyle, backgroundColor: '#7c3aed' } : 
            disabledButtonStyle
          }
          onMouseOver={(e) => {
            if (teacherCode.length === 6) {
              e.target.style.backgroundColor = '#6d28d9';
            }
          }}
          onMouseOut={(e) => {
            if (teacherCode.length === 6) {
              e.target.style.backgroundColor = '#7c3aed';
            }
          }}
        >
          Confirm Code
        </button>
      </div>
    </div>
  );

  const StudentPage = () => (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#BBFBFF',
      padding: '1rem'
    }}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            margin: '0 auto 1rem auto',
            padding: '1rem',
            backgroundColor: '#dcfce7',
            borderRadius: '50%',
            width: '4rem',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            👥
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
            Student Access
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Enter the 6-digit code
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            color: '#374151', 
            marginBottom: '0.5rem' 
          }}>
            Enter the code:
          </label>
          <input
            ref={studentInputRef}
            type="text"
            value={studentCode}
            onChange={handleStudentCodeChange}
            onKeyPress={(e) => handleKeyPress(e, handleStudentSubmit)}
            placeholder="######"
            style={{
              ...inputStyle,
              borderColor: studentCode ? '#16a34a' : '#d1d5db'
            }}
            maxLength={6}
            onFocus={(e) => e.target.style.borderColor = '#16a34a'}
            onBlur={(e) => e.target.style.borderColor = studentCode ? '#16a34a' : '#d1d5db'}
            autoFocus
          />
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            marginTop: '0.25rem', 
            textAlign: 'center' 
          }}>
            {studentCode.length}/6 digits
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={handleStudentSubmit}
            disabled={studentCode.length !== 6}
            style={studentCode.length === 6 ? 
              { ...primaryButtonStyle, backgroundColor: '#16a34a' } : 
              disabledButtonStyle
            }
            onMouseOver={(e) => {
              if (studentCode.length === 6) {
                e.target.style.backgroundColor = '#15803d';
              }
            }}
            onMouseOut={(e) => {
              if (studentCode.length === 6) {
                e.target.style.backgroundColor = '#16a34a';
              }
            }}
          >
            Submit Code
          </button>
        </div>
      </div>
    </div>
  );

  const Popup = () => (
    showPopup && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '2rem',
          maxWidth: '320px',
          width: '90%',
          textAlign: 'center',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          <div style={{
            margin: '0 auto 1rem auto',
            width: '4rem',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
          }}>
            {popupType === 'success' ? '✅' : '❌'}
          </div>
          <p style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: popupType === 'success' ? '#166534' : '#991b1b',
            margin: '0 0 1rem 0'
          }}>
            {popupMessage}
          </p>
          <div style={{
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            Auto-closing in 3 seconds...
          </div>
        </div>
      </div>
    )
  );

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
      {currentStep === 'start' && <StartPage />}
      {currentStep === 'teacher' && <TeacherPage />}
      {currentStep === 'student' && <StudentPage />}
      <Popup />
    </div>
  );
};

export default EducationalWebsite;