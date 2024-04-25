package com.example.cinematicket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class TicketRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveTicket(Ticket ticket) {
        String sql = "INSERT INTO Ticket (movies, firstName, lastName, phoneNumber, email, amount) VALUES (?,?,?,?,?,?)";
        jdbcTemplate.update(sql, ticket.getMovie(), ticket.getFirstName(), ticket.getLastName(), ticket.getPhoneNumber(), ticket.getEmail(), ticket.getAmount());
    }

    public List<Ticket> getAllTickets() {
        String sql = "SELECT * FROM Ticket";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Ticket.class));
    }

    public void deleteAllTickets() {
        String sql = "DELETE FROM Ticket";
        jdbcTemplate.update(sql);
    }
}
