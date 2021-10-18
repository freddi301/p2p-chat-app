import React from "react";
import {
  Avatar,
  Fab,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Add, Cached } from "@mui/icons-material";
import { FixedSizeList } from "react-window";
import { AutoSizer } from "react-virtualized";
import { FullScreenNavigationLayout } from "../components/FullScreenNavigationLayout";
import { useAllContacts } from "../data-hooks";

type ContactScreenProps = {
  onAdd(): void;
};
export function ContactsScreen({ onAdd }: ContactScreenProps) {
  const contacts = useAllContacts();
  return (
    <React.Fragment>
      <FullScreenNavigationLayout
        top={
          <AppBar>
            <Toolbar>
              <div style={{ flexGrow: 1 }}></div>
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={() => contacts.reload()}
              >
                <Cached />
              </IconButton>
            </Toolbar>
          </AppBar>
        }
        middle={
          <AutoSizer>
            {({ width, height }) => {
              return (
                <FixedSizeList
                  width={width}
                  height={height}
                  itemSize={72}
                  itemCount={contacts.data.length}
                  overscanCount={5}
                >
                  {({ index, style }) => {
                    const contact = contacts.data[index];
                    return (
                      <ListItem
                        style={style}
                        key={index}
                        component="div"
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar>{contact.name[0].toUpperCase()}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={contact.name}
                            secondary={contact.accountPublicKey.toHex()}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  }}
                </FixedSizeList>
              );
            }}
          </AutoSizer>
        }
      />
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Fab color="primary" aria-label="add" onClick={onAdd}>
          <Add />
        </Fab>
      </Box>
    </React.Fragment>
  );
}
