import React, {Fragment} from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {connect, useDispatch, useSelector} from "react-redux";
import {translate} from "./util/lang/translate-wrapper";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import {clearAllNotifications} from "./notificationListener";
import {notificationsConstants} from "asseco-commons";

function NotificationButton(props) {

    const dispatch = useDispatch();
    const {notifications} = useSelector(state => state.notificationListener);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function getStyles(level) {
        switch (level) {
            case notificationsConstants.LEVEL_SUCCESS:
                return {backgroundColor: "#1976d2", color: "white", borderBottom: "1px solid white"};
            case notificationsConstants.LEVEL_ERROR:
                return {backgroundColor: "#df4c4c", color: "white", borderBottom: "1px solid white"};
        }
    }

    function getIcon(level) {
        switch (level) {
            case notificationsConstants.LEVEL_SUCCESS:
                return <CheckIcon style={{marginRight: "5px"}}/>
            case notificationsConstants.LEVEL_ERROR:
                return <ErrorOutlineIcon style={{marginRight: "5px"}}/>
        }
    }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function clearAll() {
        dispatch(clearAllNotifications)
        setAnchorEl(null);
    }

    return (
        <Fragment>
            <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon/>
                </Badge>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        marginTop: "55px"
                    }
                }}
                MenuListProps={{
                    style: {
                        padding: 0,
                    },
                }}
            >
                <>
                    {notifications.length !== 0 ?
                        <>
                            {notifications.map((row, i) => (<MenuItem key={i}
                                                                      style={getStyles(row.level)}> {getIcon(row.level)} {row.dontTranslate === true ? row.contents : translate(row.contents)} </MenuItem>))}
                            <MenuItem
                                style={{marginTop: "15px"}}
                                onClick={() => clearAll()}
                            >
                                <ClearAllIcon style={{marginRight: "5px"}}/>
                                {translate("app.notifications.clearAll")}
                            </MenuItem>
                        </>
                        :
                        <MenuItem> <NotificationsOffOutlinedIcon
                            style={{marginRight: "5px"}}/> {translate("app.notifications.empty")} </MenuItem>
                    }
                </>
            </Menu>
        </Fragment>
    )
}

export default connect()(NotificationButton);