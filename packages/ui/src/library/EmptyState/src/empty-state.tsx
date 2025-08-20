import { EmptyStateSVG } from "@/lib/shared/icons/empty-state";
import {
  EMPTY_STATE_SIZES,
  useEmptyState,
  UseEmptyStateProps,
} from "./use-empty-state";
import { Button } from "@/library/Button";

// Component types
export type EmptyStateProps = UseEmptyStateProps;

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
  const {
    title,
    description,
    actionText,
    showIcon,
    customIcon,
    shouldShowAction,
    getWrapperProps,
    getSvgProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getActionProps,
    svgSize,
  } = useEmptyState(props);

  return (
    <div {...getWrapperProps()}>
      {showIcon &&
        (customIcon || <EmptyStateSVG size={svgSize} {...getSvgProps()} />)}
      <div {...getContentProps()}>
        <h3 {...getTitleProps()}>{title}</h3>
        <p {...getDescriptionProps()}>{description}</p>
        {shouldShowAction && (
          <Button {...getActionProps()}>{actionText}</Button>
        )}
      </div>
    </div>
  );
};

// String template function (updated to use size configurations)
export const stringEmptyState = ({
  title = "Nothing in here",
  description = "Some description should be provided here, if needed...",
  svgSize = "md",
}: Pick<UseEmptyStateProps, "title" | "description" | "svgSize">) => {
  const sizeConfig = EMPTY_STATE_SIZES[svgSize];

  return `
    <div class="flex items-center justify-center flex-col ${sizeConfig.wrapper}">
      <div class="flex flex-col justify-center items-center ${sizeConfig.content}">
        <h3 class="${sizeConfig.title} text-foreground">
          ${title}
        </h3>
        <p class="${sizeConfig.description} text-muted-foreground text-center">
          ${description}
        </p>
      </div>
    </div>
  `;
};
