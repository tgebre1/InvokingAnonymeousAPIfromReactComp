import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "InvokingAnonymeousApIfromReactCompWebPartStrings";
import InvokingAnonymeousApIfromReactComp from "./components/InvokingAnonymeousApIfromReactComp";
import { IInvokingAnonymeousApIfromReactCompProps } from "./components/IInvokingAnonymeousApIfromReactCompProps";

export interface IInvokingAnonymeousApIfromReactCompWebPartProps {
  description: string;
  apiURL: string;
  userID: string;
}

export default class InvokingAnonymeousApIfromReactCompWebPart extends BaseClientSideWebPart<IInvokingAnonymeousApIfromReactCompWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IInvokingAnonymeousApIfromReactCompProps> =
      React.createElement(InvokingAnonymeousApIfromReactComp, {
        description: this.properties.description,
        context: this.context,
        apiURL: this.properties.apiURL,
        userID: this.properties.userID,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneTextField("apiURL", {
                  label: "News API URL",
                }),
                PropertyPaneTextField("userID", {
                  label: "User ID",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
