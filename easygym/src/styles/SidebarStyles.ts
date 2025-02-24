import { styled } from "@mui/material/styles";
import { Drawer, ListItem, ListItemText, ListItemIcon } from "@mui/material";


export const SidebarDrawer = styled(Drawer)(({ theme }) => ({
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width:"20%",
        background: "linear-gradient(to bottom, #3a3a3a, #1a1a1a)",
        borderRight: "5px solid #fff",
        color: "#FFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        theme
    },
    "& .MuiList-root": {
        width: "-webkit-fill-available"
    }

}));

export const SidebarListItem = styled(ListItem)({

    cursor: "pointer",
    marginBottom: "8px",
    "&:hover": {
        backgroundColor: "#323232",
    },
});

export const SidebarListItemIcon = styled(ListItemIcon)({
    color: "#FFF",
    minWidth: "40px",
});

export const SidebarListItemText = styled(ListItemText)({
    color: "#FFF",
});

