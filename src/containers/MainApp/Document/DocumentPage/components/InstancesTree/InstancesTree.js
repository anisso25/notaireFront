import React, { useState } from 'react';

import TreeNode from './TreeNode';
import AddRootInstancesButtons from './AddRootInstancesButtons';
import { TreeContainer, TheTree } from './components';
import RelationshipAttachedFilesModal from '~/containers/MainApp/Instance/InstanceModal/components/RelationshipAttachedFilesModal';

const getNodePath = (tree, nodeID) => {
  if (tree?.data?.id === nodeID) {
    return [];
  }
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i += 1) {
      const path = getNodePath(tree.children[i], nodeID);
      if (path !== null) {
        path.unshift(tree.children[i]?.id);
        return path;
      }
    }
  }
  return null;
};

function InstancesTree({
  data,
  entity,
  templateEntityId,
  onOpenSelectionInstance,
  onSelectionUpdate,
}) {
  const [attachedFilesData, setAttachedFilesData] = useState();
  return (
    <TreeContainer>
      <AddRootInstancesButtons
        entity={entity}
        onOpenSelectionInstance={templateEntity => {
          onOpenSelectionInstance({
            templateEntity,
            templateEntityId,
            pathDepth: 1, // To know that is a root node insertion
          });
        }}
      />
      <TheTree
        showLine={{ showLeafIcon: false }}
        showIcon={false}
        defaultExpandAll
        treeData={data || []}
        titleRender={(node) => (
          <TreeNode
            {...node?.data || {}}
            getPath={() => getNodePath({ children: data }, node?.data?.id)}
            onSelectionUpdate={onSelectionUpdate}
            onShowAttachedFiles={(files) => {
              setAttachedFilesData({
                attachedFiles: files,
                relatedToId: {},
              });
            }}
            onOpenSelectionInstance={nodeData => {
              onOpenSelectionInstance({
                ...nodeData,
                templateEntityId,
                ParentInstanceId: node?.data?.Instance?.id,
              });
            }}
          />
        )}
      />

      <RelationshipAttachedFilesModal
        onClose={() => setAttachedFilesData()}
        data={attachedFilesData}
        canEditFiles={false}
      />
    </TreeContainer>
  );
}

export default InstancesTree;
