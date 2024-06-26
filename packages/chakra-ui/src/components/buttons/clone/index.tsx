import React from "react";
import { useCloneButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { Button, IconButton } from "@chakra-ui/react";
import { IconSquarePlus } from "@tabler/icons-react";

import { CloneButtonProps } from "../types";

/**
 * `<CloneButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/clone-button} for more details.
 *
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  recordItemId,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, hidden, disabled, LinkComponent } = useCloneButton({
    resource: resourceNameFromProps ?? resourceNameOrRouteName,
    id: recordItemId,
    accessControl,
    meta,
  });

  if (hidden) return null;

  return (
    <LinkComponent
      to={to}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      {hideText ? (
        <IconButton
          variant="outline"
          isDisabled={disabled}
          aria-label={label}
          title={title}
          data-testid={RefineButtonTestIds.CloneButton}
          className={RefineButtonClassNames.CloneButton}
          {...rest}
        >
          <IconSquarePlus size={20} {...svgIconProps} />
        </IconButton>
      ) : (
        <Button
          variant="outline"
          isDisabled={disabled}
          leftIcon={<IconSquarePlus size={20} {...svgIconProps} />}
          title={title}
          data-testid={RefineButtonTestIds.CloneButton}
          className={RefineButtonClassNames.CloneButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </LinkComponent>
  );
};
