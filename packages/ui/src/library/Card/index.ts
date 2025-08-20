import { useCard } from "./src/use-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  CardProvider,
  CardHeaderWithContext,
  CardTitleWithContext,
  CardDescriptionWithContext,
  CardActionWithContext,
  CardContentWithContext,
  CardFooterWithContext,
  CardProps,
  type CardSubComponentProps,
} from "./src/card";

export {
  // Hook
  useCard,

  // Standalone components (original approach)
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,

  // Context-based components (alternative approach)
  CardProvider,
  CardHeaderWithContext,
  CardTitleWithContext,
  CardDescriptionWithContext,
  CardActionWithContext,
  CardContentWithContext,
  CardFooterWithContext,
  type CardProps,
  type CardSubComponentProps,
};
