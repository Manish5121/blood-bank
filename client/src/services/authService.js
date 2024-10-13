import { userLogin, userRegister } from "../redux/features/auth/authActions"
import store from "../redux/store"

export const handleLogin = async (e, email, password, role) => {
  e.preventDefault()
  try {
    if (!role || !email || !password) {
      alert("Please provide all fields")
      return
    }

    console.log("Attempting login with:", { email, role })

    const result = await store.dispatch(userLogin({ email, password, role }))

    console.log("Login result:", result)

    if (result.payload && result.payload.success) {
      console.log("Login successful")
      // You might want to redirect the user or update the UI here
      return true
    } else {
      console.log(
        "Login failed:",
        result.payload ? result.payload.message : "Unknown error"
      )
      alert(
        result.payload
          ? result.payload.message
          : "Login failed. Please try again."
      )
      return false
    }
  } catch (error) {
    console.error("Login error:", error)
    alert("An error occurred during login. Please try again.")
    return false
  }
}

export const handleRegister = async (
  e,
  name,
  role,
  email,
  password,
  phone,
  organisationName,
  address,
  hospitalName,
  website
) => {
  e.preventDefault()
  try {
    if (!name || !role || !email || !password) {
      alert("Please provide all required fields")
      return
    }

    console.log("Attempting registration with:", { name, role, email })

    const result = await store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      })
    )

    console.log("Registration result:", result)

    if (result.payload && result.payload.success) {
      console.log("Registration successful")
      alert("Registration successful! You can now log in.")
      // You might want to redirect the user or update the UI here
      return true
    } else {
      console.log(
        "Registration failed:",
        result.payload ? result.payload.message : "Unknown error"
      )
      alert(
        result.payload
          ? result.payload.message
          : "Registration failed. Please try again."
      )
      return false
    }
  } catch (error) {
    console.error("Registration error:", error)
    alert("An error occurred during registration. Please try again.")
    return false
  }
}
