import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import Box from "@mui/system/Box";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import {
  Palette,
  LogOut,
  Mail,
  BadgeCheck,
  Sparkles,
} from "lucide-react";


const username = localStorage.getItem("username") || "there";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% -10%, #3E2A52 0%, #241B2F 45%, #1A1422 100%)",
        color: "#F4EFE6",
      }}
    >
      {/* Top bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #2A1F38 0%, #241B2F 100%)",
          borderBottom: "1px solid rgba(201,162,39,0.25)",
        }}
      >
        <Toolbar>
          <Palette size={22} color="#C9A227" style={{ marginRight: 10 }} />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: 0.5,
            }}
          >
            Arts Tracking
          </Typography>
          <Button
            onClick={handleLogout}
            startIcon={<LogOut size={18} />}
            sx={{
              color: "#F4EFE6",
              borderRadius: "999px",
              px: 2,
              border: "1px solid rgba(244,239,230,0.25)",
              textTransform: "none",
              "&:hover": {
                borderColor: "#C9A227",
                backgroundColor: "rgba(201,162,39,0.08)",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 5, md: 8 } }}>
        {/* Greeting */}
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: "#C9A227",
              letterSpacing: 3,
              fontSize: 13,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Welcome back
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            Hi, {username}
            <Sparkles size={28} color="#C9A227" />
          </Typography>
        </Box>

        {/* Signature framed card */}
        <Box
          sx={{
            position: "relative",
            maxWidth: 560,
            p: "1px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(201,162,39,0.6), rgba(62,137,137,0.4), rgba(201,162,39,0.2))",
          }}
        >
          <Box
            sx={{
              borderRadius: "19px",
              p: 4,
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(14px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* ambient glow */}
            <Box
              sx={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(201,162,39,0.25), transparent 70%)",
                top: -80,
                right: -80,
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "#C9A227",
                  color: "#1A1422",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 22,
                }}
              >
                SP
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 19,
                    fontWeight: 600,
                  }}
                >
                  Shiva Sai Teja Paripelli
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "rgba(244,239,230,0.65)",
                  }}
                >
                  Creator of this Spring Security Project
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <BadgeCheck size={18} color="#3E8989" />
                <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}>
                  Full-Stack Developer
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Mail size={18} color="#3E8989" />
                <Typography
                  component="a"
                  href="mailto:your-email@example.com"
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#F4EFE6",
                    textDecoration: "none",
                    "&:hover": { color: "#C9A227" },
                  }}
                >
                  shivaparipelli29@example.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
