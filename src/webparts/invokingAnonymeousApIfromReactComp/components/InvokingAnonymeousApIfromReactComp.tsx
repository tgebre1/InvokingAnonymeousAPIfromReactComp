import * as React from "react";
import styles from "./InvokingAnonymeousApIfromReactComp.module.scss";
import { IInvokingAnonymeousApIfromReactCompProps } from "./IInvokingAnonymeousApIfromReactCompProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { IAnnoneousAPIState } from "./IAnnoneousAPIState";
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";

export default class InvokingAnonymeousApIfromReactComp extends React.Component<
  IInvokingAnonymeousApIfromReactCompProps,
  IAnnoneousAPIState
> {
  public constructor(
    props: IInvokingAnonymeousApIfromReactCompProps,
    state: IAnnoneousAPIState
  ) {
    super(props);
    this.state = {
      id: null,
      name: null,
      username: null,
      email: null,
      address: null,
      phone: null,
      website: null,
      company: null,
    };
  }
  public getUserDetails(): Promise<any> {
    let url = this.props.apiURL + "/" + this.props.userID;

    return this.props.context.httpClient
      .get(url, HttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        return response.json();
      })
      .then((jsonResponse) => {
        return jsonResponse;
      }) as Promise<any>;
  }

  public InvokeAPIAndSetDataIntoState() {
    this.getUserDetails().then((response) => {
      this.setState({
        id: response.id,
        name: response.name,
        username: response.username,
        email: response.email,
        address:
          "Street " +
          response.address.street +
          " Suite: " +
          response.address.suite +
          " City" +
          response.address.city,
        phone: response.phone,
        website: response.website,
        company: response.company.name,
      });
    });
  }
  public componentDidMount(): void {
    this.InvokeAPIAndSetDataIntoState();
  }

  public componentDidUpdate(
    prevProps: Readonly<IInvokingAnonymeousApIfromReactCompProps>,
    prevState: Readonly<IAnnoneousAPIState>,
    snapshot?: any
  ): void {
    this.InvokeAPIAndSetDataIntoState();
  }
  public render(): React.ReactElement<IInvokingAnonymeousApIfromReactCompProps> {
    return (
      <div className={styles.invokingAnonymeousApIfromReactComp}>
        <span className={styles.title}>User Details:</span>

        <div>
          <strong>ID: </strong>
          {this.state.id}
        </div>
        <br />
        <div>
          <strong>Name: </strong>
          {this.state.name}
        </div>
        <br />
        <div>
          <strong>Username: </strong>
          {this.state.username}
        </div>
        <br />
        <div>
          <strong>Email: </strong>
          {this.state.email}
        </div>
        <br />
        <div>
          <strong>Address: </strong>
          {this.state.address}
        </div>
        <br />
        <div>
          <strong>Phone: </strong>
          {this.state.phone}
        </div>
        <br />
        <div>
          <strong>Website: </strong>
          {this.state.address}
        </div>
        <br />
        <div>
          <strong>Company: </strong>
          {this.state.company}
        </div>
      </div>
    );
  }
}
