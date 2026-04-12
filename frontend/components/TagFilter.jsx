import React from 'react';
import { Chip, Stack } from '@mui/material';

const TagFilter = ({ tags = [], selectedTag = '', onChange }) => {
    const handleTagClick = (tag) => {
        if (!onChange) return;

        onChange(selectedTag === tag ? '' : tag);
    };

    return (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {tags.map((tag) => {
                const isSelected = selectedTag === tag;

                return (
                    <Chip
                        key={tag}
                        label={tag}
                        onClick={() => handleTagClick(tag)}
                        color={isSelected ? 'primary' : 'default'}
                        variant={isSelected ? 'filled' : 'outlined'}
                    />
                );
            })}
        </Stack>
    );
};

export default TagFilter;