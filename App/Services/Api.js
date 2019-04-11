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
    baseURL: 'http://9219a6b4.ngrok.io',
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: 'http://9219a6b4.ngrok.io/api/v1',
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
    const { reportContent , school_id ,user_id,image} = payload
    console.log('Report Content is : ', payload)
    const data = new FormData();
    if (image) {
      data.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg'
      });
    }
    data.append('school_id',school_id)
    data.append('user_id',user_id)
    data.append('report_text',reportContent)
    console.log("data : ", data)
    return api.post('/reports', data, { headers })
  }


  const allSchoolsData = (payload, headers) =>{
    return api.get('/schools',{}, { headers })
  } 
  
  const allReports = (payload, headers) =>{
    return api.get('/reports',{}, { headers })
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
    allReports,
  }
}

// let's return back our create method as the default.
export default {
  create
}
