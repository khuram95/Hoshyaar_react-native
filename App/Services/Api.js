// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = () => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  const authApi = apisauce.create({
<<<<<<< HEAD
    baseURL: 'http://d32c4cd1.ngrok.io',
=======
    baseURL: 'http://9a0cbf32.ngrok.io',
>>>>>>> aee9c4e... only api is change
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const api = apisauce.create({
    // base URL is read from the "constructor"
<<<<<<< HEAD
    baseURL: 'http://d32c4cd1.ngrok.io/api/v1',
=======
    baseURL: 'http://9a0cbf32.ngrok.io/api/v1',
>>>>>>> aee9c4e... only api is change
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  const login = (email, password) =>{
    
    return authApi.get('auth/sign_up', { email, password })}

  const signout = (headers) =>
    authApi.delete('auth/sign_out', {}, { headers })

  const createReport = (payload, headers) =>{
    const { reportContent } = payload
    console.log('Report Content is : ', reportContent)
    return api.post('/reports',{ report_text: reportContent }, { headers })
  }


  const allSchoolsData = (payload, headers) =>{
    return api.get('/schools',{}, { headers })
  } 
    

  const SchoolDetailData = (payload, headers) =>{
    const { school_id } = payload
    const formData = new FormData();
    formData.append('school_id', school_id);
    return api.get('/school_details', {school_id: school_id} , { headers })
  }

  const uniqueSchoolsData = (payload, headers) =>{
    const {district, tehsil } = payload
    const formData = new FormData();
    formData.append('district', district);
    formData.append('tehsil', tehsil); 
    return api.put('/schools/sorted_data',formData,{ headers })
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    login,
    signout,
    createReport,
    allSchoolsData,
    SchoolDetailData,
    uniqueSchoolsData,
  }
}

// let's return back our create method as the default.
export default {
  create
}
