import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the port as necessary

export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/students`);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const addStudent = async (student) => {
    try {
        const response = await axios.post(`${API_URL}/students`, student);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
};