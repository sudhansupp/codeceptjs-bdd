import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { navigate } from 'gatsby';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const useTreeItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
        '&:focus > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

const handleClick = function(event,treeItemData) {
    event.preventDefault();
    if (treeItemData.href) {
        navigate(treeItemData.href);
    }
};
const getLocalStorage = ()=> {
     const windowGlobal = typeof window !== 'undefined' && window;
     return windowGlobal.localStorage;
};

const getTreeItemsFromData = (treeItems) => {


    return treeItems.map(treeItemData => {
        let children = undefined;
        const classes = useTreeItemStyles();

        if (treeItemData.children && treeItemData.children.length > 0) {
            children = getTreeItemsFromData(treeItemData.children);
        }

        return (
            <TreeItem
                key={treeItemData.key}
                nodeId={treeItemData.nodeId}
                children={children}
                onClick={ (e) => {handleClick(e,treeItemData)}}
                label = {
                    <div className={classes.labelRoot}>
                        <Typography variant="body2" className={treeItemData.label}>
                            {treeItemData.label}
                        </Typography>
                    </div>
                }
                style={{
                    '--tree-view-color': '#1a73e8',
                    '--tree-view-bg-color': '#e8f0fe',
                }}
                classes={{
                    root: classes.root,
                    content: classes.content,
                    expanded: classes.expanded,
                    group: classes.group,
                    label: classes.label,
                }}
            />
            );
    });
};

const getExpandedNodesFromLocalStorage = ()=>{
    const localStorage = getLocalStorage();
    return localStorage && JSON.parse(localStorage.getItem("codeceptjs:documentation:sidebar:docs"));
};

// export default function FileSystemNavigator({ treeItems }) {
//
//     const handleChange = (event, nodes) => {
//         const localStorage = getLocalStorage();
//         localStorage && localStorage.setItem("codeceptjs:documentation:sidebar:docs", JSON.stringify(nodes));
//     };
//     return (
//         <TreeView
//             defaultCollapseIcon={<ExpandMoreIcon />}
//             defaultExpandIcon={<ChevronRightIcon />}
//             defaultExpanded={getExpandedNodesFromLocalStorage()}
//             onNodeToggle={handleChange}
//         >
//             {getTreeItemsFromData(treeItems)}
//         </TreeView>
//     );
// }

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default function FileSystemNavigator({ treeItems }) {
    const classes = useStyles();
    const handleChange = (event, nodes) => {
        const localStorage = getLocalStorage();
        localStorage && localStorage.setItem("codeceptjs:documentation:sidebar:docs", JSON.stringify(nodes));
    };
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultExpanded={getExpandedNodesFromLocalStorage()}
            onNodeToggle={handleChange}
            defaultEndIcon={<div style={{ width: 0.2 }} />}
        >
            {getTreeItemsFromData(treeItems)}
        </TreeView>
    );
}