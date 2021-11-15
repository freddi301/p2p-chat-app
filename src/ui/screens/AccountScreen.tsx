import React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { HeaderContentControlsLayout } from "../components/HeaderContentControlsLayout";
import { Text } from "../components/Text";
import { ButtonGroup } from "../components/ButtonGroup";
import { css } from "styled-components/macro";
import { StyleContext } from "../StyleProvider";
import { FrontendFacade } from "../FrontendFacade";
import { NavigationContext } from "../NavigationStack";
import { SimpleHeader } from "../components/SimpleHeader";

type AccountScreenProps = {
  publicKey: string;
  onUse(accountPublicKey: string): void;
};

export function AccountScreen({ publicKey, onUse }: AccountScreenProps) {
  const navigationStack = React.useContext(NavigationContext);
  const { theme } = React.useContext(StyleContext);
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const account = FrontendFacade.useAccountByPublicKey(publicKey);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!isLoaded && account) {
      setName(account.name);
      setNotes(account.notes);
      setIsLoaded(true);
    }
  }, [account, isLoaded]);
  const onSave = React.useCallback(() => {
    FrontendFacade.doUpdateAccount(publicKey, name, notes);
  }, [name, notes, publicKey]);
  const setCurrentAccount = () => {
    onUse(publicKey);
    navigationStack.pop();
  };
  const onDelete = () => {
    FrontendFacade.doDeleteAccount(publicKey);
    navigationStack.pop();
  };
  return (
    <HeaderContentControlsLayout
      header={
        <SimpleHeader>
          <Text text="Account" color="primary" weight="bold" size="big" />
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
          <Input label="Public Key" value={publicKey} />
          <Textarea label="Notes" value={notes} onChange={setNotes} rows={5} />
        </div>
      }
      controls={
        <ButtonGroup>
          <Button label="Delete" icon="Delete" onClick={onDelete} enabled={isLoaded} showLabel={false} />
          <Button label="Share" icon="Share" onClick={() => {}} enabled={false} showLabel={false} />
          <Button label="Export" icon="Export" onClick={() => {}} enabled={false} showLabel={false} />
          <Button label="Save" icon="Save" onClick={onSave} enabled={true} showLabel={false} />
          <Button label="Use" icon="UseAccount" onClick={setCurrentAccount} enabled={true} showLabel={true} />
        </ButtonGroup>
      }
    />
  );
}
