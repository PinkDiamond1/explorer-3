import "./IdentityTree.scss";

import React, { Component, ReactNode } from "react";

import IdentityTreeItem from "./IdentityTreeItem";
import { IdentityTreeProps } from "./IdentityTreeProps";
import { IdentityTreeState } from "./IdentityTreeState";
import { IdentityHelper } from "../../../../helpers/identityHelper";

export default class IdentityMessageIdOverview extends Component<IdentityTreeProps, IdentityTreeState> {
    constructor(props: IdentityTreeProps) {
        super(props);

        this.state = {
            selectedMessageId: this.props.history?.integrationChainData?.[0].messageId ?? ""
        };
    }

    public render(): ReactNode {
        return (
            <div className="identity-tree">
                {this.props.history?.integrationChainData?.map((value, index) => (
                    <IdentityTreeItem
                        network={this.props.network}
                        messageId={value?.messageId}
                        key={index}
                        lastMsg={index === (this.props.history?.integrationChainData?.length ?? 0) - 1}
                        nested={false}
                        firstMsg={index === 0}
                        selectedMessageId={this.state.selectedMessageId}
                        messageContent={value.document}
                        documentContent={IdentityHelper.getDocumentFromIntegrationMsg(value.document)}
                        parentFirstMsg={undefined}
                        onItemClick={selectedItem => {
                            this.setState({
                                selectedMessageId: selectedItem.messageId ?? ""
                            });
                            this.props.onItemClick(selectedItem);
                        }}
                        contentState="doc"
                    />
                ))}
            </div>
        );
    }
}
