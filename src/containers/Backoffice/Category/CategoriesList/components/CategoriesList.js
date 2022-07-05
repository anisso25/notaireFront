import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Space,
  Popconfirm,
  Tooltip,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  fetchCategoriesList,
  deleteCategory,
} from '~/containers/Backoffice/Category/actions';
import { CTable } from '~/lab';
import categoryColumns from '~/containers/Backoffice/Category/columns';
import CategoryModal from '~/containers/Backoffice/Category/CategoryModal';

const perPage = 10;

function CategoriesList({
  data,
  showNewCategoryButton = true,
  withSearch = true,
  withPagination = true,
}) {
  const { t } = useTranslation(['AppManagement', 'Global']);
  const dispatch = useDispatch();
  const {
    isFetching,
    list,
    total,
    isDeleting,
  } = useSelector(state => state.category);

  const [categoriesList, setCategoriesList] = useState(list || []);
  const [showCategoryEditionModal, setShowCategoryEditionModal] = useState(false);
  const [recordInDeletion, setRecordInDeletion] = useState();
  const [categoryToUpdate, setCategoryToUpdate] = useState();

  const [listParams, setListParams] = useState({
    page: 1,
    perPage,
    search: '',
  });

  const fetchCategories = useCallback(() => {
    dispatch(fetchCategoriesList(listParams));
  }, [dispatch, listParams]);

  const onUpdateCategory = (record) => {
    const formData = { ...record };
    setCategoryToUpdate(formData);
    setShowCategoryEditionModal(true);
  };

  const onNewCategory = () => {
    setCategoryToUpdate();
    setShowCategoryEditionModal(true);
  };

  const onCloseCategoryModal = () => {
    setCategoryToUpdate();
    setShowCategoryEditionModal(false);
  };

  const onSearch = (term) => {
    setListParams({
      ...listParams,
      page: 1,
      search: term,
    });
  };

  const onCategoryModalActionDone = () => {
    // Update case
    if (categoryToUpdate) {
      setCategoryToUpdate();
      fetchCategories();
    } else {
      setListParams({
        ...listParams,
        page: 1,
      });
    }
  };

  const actionsColumn = useMemo(() => {
    const onDelete = (id) => {
      setRecordInDeletion(id);
      dispatch(
        deleteCategory(
          id,
          () => {
            fetchCategories();
            setRecordInDeletion();
          },
          () => setRecordInDeletion(),
        ),
      );
    };

    return [
      {
        width: '120px',
        render: (record) => {
          const { id } = record;
          return (
            <Space>
              <Tooltip title={t('Global:edit')}>
                <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => onUpdateCategory(record)}
                />
              </Tooltip>
              <Popconfirm
                title={t('Global:are_you_sure')}
                onConfirm={() => onDelete(id)}
                okText={t('Global:yes')}
                cancelText={t('Global:no')}
              >
                <Tooltip title={t('Global:delete')}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                    loading={id === recordInDeletion ? isDeleting : false}
                  />
                </Tooltip>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, [dispatch, fetchCategories, isDeleting, recordInDeletion, t]);

  const categoriesListColumns = useMemo(() => (
    categoryColumns(t).concat(actionsColumn)
  ), [t, actionsColumn]);

  useEffect(() => {
    fetchCategories();
  }, [listParams]);

  useEffect(() => {
    setCategoriesList(list);
  }, [list]);

  return (
    <>
      <CTable
        columns={categoriesListColumns}
        dataSource={data || categoriesList}
        loading={isFetching}
        withSearch={withSearch}
        onSearch={onSearch}
        extraButton={(
          showNewCategoryButton && (
            <Button
              type="primary"
              onClick={onNewCategory}
            >
              { t('AppManagement:category.cta_new') }
            </Button>
          )
        )}
        pagination={
          withPagination && ({
            pageSize: perPage,
            onChange: (page) => {
              setListParams({
                ...listParams,
                page,
              });
            },
            total,
          })
        }
      />
      <CategoryModal
        visible={showCategoryEditionModal}
        onClose={onCloseCategoryModal}
        record={categoryToUpdate}
        onDone={onCategoryModalActionDone}
      />
    </>
  );
}

export default CategoriesList;

