import axios from "axios";
const API = axios.create({
    baseURL:
        "http://localhost:5000/"// Update with your Backend URL
    ,
});


const auth = async (input, type) => {
    console.log(input, type)
    const response = await API.post(`api/user/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password,
    })

    return response.data
}

const getBlogs = async () => {
    const response = await API.get("api/blog")

    return response.data
}

const getBlogsById = async (input) => {
    const response = await API.get(`api/blog/${input}`)
    return response.data
}

const getBlogsByUserId = async (input) => {
    const response = await API.get(`api/blog/user/${input}`)
    console.log(response.data)
    return response.data
}


const addBlog = async (input) => {

    const response = await API.post(`api/blog/add`, input)

    return response.data
}

const deleteBlog = async (input) => {

    const response = await API.delete(`api/blog/${input}`)

    return response.data
}
const editBlog = async (id, input) => {

    const response = await API.put(`api/blog/update/${id}`, input)

    return response.data
}

export default { auth, getBlogs, addBlog, deleteBlog, editBlog, getBlogsById, getBlogsByUserId }