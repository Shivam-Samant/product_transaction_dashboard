import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  IconButton,
  Typography,
  TablePagination,
  Box,
  Button,
  Skeleton,
} from '@mui/material'
import { Search } from '@mui/icons-material'

const TransactionList = ({
  transactionData,
  month = 3,
  setMonth,
  searchText,
  setSearchText,
  page,
  setPage,
  perPage,
  setPerPage,
  isLoading,
}) => {
  const handleMonthChange = (event) => {
    setMonth(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1) // +1 because of 0 base indexing
  }

  const handleChangeRowsPerPage = (event) => {
    setPerPage(+event.target.value)
    setPage(1)
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <InputLabel>Month</InputLabel>
            <Select label="Month" value={month} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {new Date(2021, index).toLocaleString('en-US', {
                    month: 'long',
                  })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <TextField
            label="Search"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>

      <TableContainer sx={{ mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'S. NO.',
                'IMAGE',
                'TITLE',
                'DESCRIPTION',
                'CATEGORY',
                'PRICE',
                'STATUS',
              ].map((cellValue) => (
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    color: '#00302d',
                    fontSize: '1rem',
                  }}
                >
                  {cellValue}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : transactionData?.transactions?.map((transaction, idx) => (
                  <TableRow key={transaction.id}>
                    <TableCell sx={{ width: '3rem' }}>
                      {(page - 1) * 10 + idx + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={transaction.image}
                        alt="Product image"
                        height={100}
                        width={100}
                      />
                    </TableCell>
                    <TableCell>{transaction.title}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          '-webkit-line-clamp': '3',
                          '-webkit-box-orient': 'vertical',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {transaction.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#1a6399' }}
                      >
                        {transaction.category}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{ width: '6.5rem' }}
                      >
                        ₹ {transaction.price.toFixed(2)}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {transaction.sold ? (
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ width: '5rem' }}
                        >
                          Sold
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ width: '5rem' }}
                        >
                          Unsold
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={transactionData?.totalCount}
        rowsPerPage={perPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default TransactionList
