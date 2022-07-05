import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  Collapse,
  Space,
} from 'antd';
import { LoadingOutlined, LeftOutlined, DownOutlined } from '@ant-design/icons';
import {
  TableContainer,
  SearchInputContainer,
  SearchMainInput,
  ToggleAdvancedSearch,
  AdvancedSearchContainer,
} from './components';
// eslint-disable-next-line import/no-cycle
import AdvancedSearch from './AdvancedSearch';
import { useDebounce } from '~/hooks';

function CTable({
  dataSource,
  withSearch,
  withAdvancedSearch = false,
  onSearch,
  extraButton,
  hideTable = false,
  loading,
  columns,
  ...props
}) {
  const searchMainInputRef = useRef();
  const location = useLocation();
  const [term, setTerm] = useState();
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(term, 1000);

  const { t } = useTranslation('Global');

  const handleChange = useCallback(e => {
    setTerm(e.target.value);
  }, []);

  useEffect(() => {
    if (
      withSearch && debouncedSearchTerm !== undefined
      // && (term.length >= 3 || term.length === 0)
    ) {
      if (withAdvancedSearch) {
        onSearch({ 'search[0][value]': term });
      } else {
        onSearch(term);
      }
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!loading) {
      searchMainInputRef?.current?.focus();
    }
  }, [loading, searchMainInputRef]);

  const onToggleAdvancedSearch = useCallback((opened) => {
    setIsAdvancedSearchOpen(opened.length > 0);
  }, []);

  const onAdvancedSearchParamsChange = (params) => {
    onSearch(params);
  };

  useEffect(() => {
    setIsAdvancedSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (isAdvancedSearchOpen) {
      setTerm('');
    }
  }, [isAdvancedSearchOpen]);

  return (
    <TableContainer>
      <Collapse
        ghost
        onChange={onToggleAdvancedSearch}
        collapsible="header"
        activeKey={isAdvancedSearchOpen ? ['advanced_search'] : []}
      >
        <AdvancedSearchContainer
          key="advanced_search"
          showArrow={false}
          header={(
            withSearch && (
              <>
                <SearchInputContainer
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                >
                  <SearchMainInput
                    ref={searchMainInputRef}
                    placeholder={t('search_here')}
                    onChange={handleChange}
                    value={term}
                    suffix={loading ? <LoadingOutlined style={{ fontSize: '14px' }} /> : <span />}
                    disabled={isAdvancedSearchOpen}
                  />
                </SearchInputContainer>
                {withAdvancedSearch && (
                  <ToggleAdvancedSearch type="link" size="small">
                    {t('advanced_search')}
                    {isAdvancedSearchOpen ? <DownOutlined /> : <LeftOutlined />}
                  </ToggleAdvancedSearch>
                )}
              </>
            )
          )}
          extra={(
            <Space>
              { extraButton }
            </Space>
          )}
        >
          <AdvancedSearch
            columns={columns}
            onParamsChange={onAdvancedSearchParamsChange}
            loading={loading}
            isOpen={isAdvancedSearchOpen}
          />
        </AdvancedSearchContainer>
      </Collapse>

      { !hideTable && (
        <Table
          dataSource={dataSource}
          scroll={{ x: '100%' }}
          loading={loading}
          columns={columns}
          {...props}
        />
      )}
    </TableContainer>
  );
}
export default CTable;
