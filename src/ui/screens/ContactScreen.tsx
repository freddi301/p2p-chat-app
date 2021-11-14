import React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { HeaderContentControlsLayout } from "../components/HeaderContentControlsLayout";
import { Text } from "../components/Text";
import { ButtonGroup } from "../components/ButtonGroup";
import { css } from "styled-components/macro";
import { StyleContext } from "../StyleProvider";
import { FrontendFacade } from "../../logic/FrontendFacade";
import { NavigationContext } from "../NavigationStack";
import { SimpleHeader } from "../components/SimpleHeader";

type ContactScreenProps = {
  publicKey: string;
};

export function ContactScreen({ publicKey }: ContactScreenProps) {
  const navigationStack = React.useContext(NavigationContext);
  const { theme } = React.useContext(StyleContext);
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const contact = FrontendFacade.useContactByPublicKey(publicKey);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!isLoaded && contact) {
      setName(contact.name);
      setNotes(contact.notes);
      setIsLoaded(true);
    }
  }, [contact, isLoaded]);
  const onSave = React.useCallback(() => {
    FrontendFacade.doUpdateContact(publicKey, name, notes);
  }, [name, notes, publicKey]);
  const onDelete = () => {
    FrontendFacade.doDeleteContact(publicKey);
    navigationStack.pop();
  };
  const onConversation = () => {
    navigationStack.push({ screen: "conversation", otherPublicKey: publicKey });
  };
  return (
    <HeaderContentControlsLayout
      header={
        <SimpleHeader>
          <Text text="Contact" color="primary" weight="bold" size="big" />
        </SimpleHeader>
      }
      content={
        <div
          css={css`
            display: grid;
            grid-auto-flow: row;
            grid-auto-columns: auto;
            padding: ${theme.spacing.text.vertical} ${theme.spacing.text.horizontal};
            row-gap: ${theme.spacing.gap};
          `}
        >
          <Input label="Name" value={name} onChange={setName} />
          <Textarea label="Notes" value={notes} onChange={setNotes} rows={5} />
          <Input label="Public Key" value={publicKey} />
        </div>
      }
      controls={
        <ButtonGroup>
          <Button label="Delete" icon="Delete" onClick={onDelete} enabled={isLoaded} showLabel={false} />
          <Button label="Share" icon="Share" onClick={() => {}} enabled={true} showLabel={false} />
          <Button label="Save" icon="Save" onClick={onSave} enabled={isLoaded} showLabel={false} />
          <Button label="Conversation" icon="Conversation" onClick={onConversation} enabled={true} showLabel={true} />
        </ButtonGroup>
      }
    />
  );
}
