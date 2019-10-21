import React from "react";
import {Drawer} from "antd";

export default function Details({children, visible, onClose, title}) {

    return <Drawer
        title={title}
        width={500}
        placement="right"
        visible={visible}
        onClose={onClose}
    >
        {children}
    </Drawer>
}