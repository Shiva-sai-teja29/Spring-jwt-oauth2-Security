import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../services/authService";
import GoogleIcon from "@mui/icons-material/Google";
import { register } from "../services/authService";
import { useState } from "react";
import { Palette, Sparkles } from "lucide-react";

const gold = "#C9A227";
const teal = "#3E8989";
const parchment = "#F4EFE6";

// Shared field styling so inputs read on a dark glass card
const fieldSx = {
  "& .MuiInputLabel-root": { color: "rgba(244,239,230,0.6)" },
  "& .MuiInputLabel-root.Mui-focused": { color: gold },
  "& .MuiOutlinedInput-root": {
    color: parchment,
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(244,239,230,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(201,162,39,0.5)" },
    "&.Mui-focused fieldset": { borderColor: gold },
  },
};

export default function LoginPage() {
  const [tab, setTab] = useState(0);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };
  const handleLogin = async () => {
    try {
      const response = await login(username, password);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("username", username);

      window.location.href = "/dashboard";
    } catch (error) {
      alert(error + ": Invalid Username or Password");
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    try {
      await register(username, email, password);

      alert("Registration Successful");

      setTab(0);
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "radial-gradient(circle at 20% -10%, #3E2A52 0%, #241B2F 45%, #1A1422 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 470,
          maxWidth: "100%",
          p: "1px",
          borderRadius: "22px",
          background:
            "linear-gradient(135deg, rgba(201,162,39,0.6), rgba(62,137,137,0.4), rgba(201,162,39,0.2))",
        }}
      >
        <Card
          sx={{
            borderRadius: "21px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
            boxShadow: "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ambient glow */}
          <Box
            sx={{
              position: "absolute",
              width: 240,
              height: 240,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,162,39,0.22), transparent 70%)",
              top: -90,
              right: -90,
            }}
          />

          <CardContent sx={{ position: "relative", p: 4 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <Palette size={22} color={gold} />
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  color: parchment,
                }}
              >
                Starting Page
              </Typography>
            </Stack>

            <Typography
              align="center"
              sx={{
                mb: 3,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: gold,
              }}
            >
              Welcome back
            </Typography>

            <Tabs
              value={tab}
              onChange={(e, value) => setTab(value)}
              centered
              sx={{
                mb: 1,
                "& .MuiTab-root": {
                  fontFamily: "'Inter', sans-serif",
                  textTransform: "none",
                  color: "rgba(244,239,230,0.5)",
                  fontWeight: 500,
                },
                "& .Mui-selected": { color: `${gold} !important` },
                "& .MuiTabs-indicator": { backgroundColor: gold },
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            <Box sx={{ mt: 3 }}>
              {tab === 0 && (
                <Stack spacing={2}>
                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={fieldSx}
                  />

                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={fieldSx}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      py: 1.1,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      backgroundColor: gold,
                      color: "#1A1422",
                      "&:hover": { backgroundColor: "#B8931F" },
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              )}

              {tab === 1 && (
                <Stack spacing={2}>
                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={fieldSx}
                  />

                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={fieldSx}
                  />

                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={fieldSx}
                  />

                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    sx={fieldSx}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleRegister}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      py: 1.1,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      backgroundColor: gold,
                      color: "#1A1422",
                      "&:hover": { backgroundColor: "#B8931F" },
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              )}

              <Divider
                sx={{
                  my: 3,
                  color: "rgba(244,239,230,0.4)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  "&::before, &::after": {
                    borderColor: "rgba(244,239,230,0.15)",
                  },
                }}
              >
                OR
              </Divider>

              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                fullWidth
                onClick={handleGoogleLogin}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  py: 1.1,
                  fontFamily: "'Inter', sans-serif",
                  color: parchment,
                  borderColor: "rgba(244,239,230,0.25)",
                  "&:hover": {
                    borderColor: teal,
                    backgroundColor: "rgba(62,137,137,0.08)",
                  },
                }}
              >
                Continue with Google
              </Button>

              <Typography
                align="center"
                sx={{
                  mt: 3,
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(244,239,230,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                By continuing you agree to our{" "}
                <Link href="#" sx={{ color: gold, textDecorationColor: gold }}>
                  Terms
                </Link>
                <Sparkles size={14} color={gold} />
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
