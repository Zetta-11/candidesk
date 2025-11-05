package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.status.CandidateStatus;
import com.fpm.klimmenkov.candidesk.dto.CandidateDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CandidateScrapper {
    private static final String BASE_URL = "https://www.work.ua/ru/resumes-it-%s/";
    private static final int TIMEOUT_MS = 10000;
    private static final AtomicInteger ID_GEN = new AtomicInteger(1000);
    private static final Pattern NAME_PATTERN = Pattern.compile("([A-ZА-ЯЇІЄ][A-ZА-ЯЇІЄa-zа-яїіє]+)\\s+([A-ZА-ЯЇІЄ][A-ZА-ЯЇІЄa-zа-яїіє]+)");

    public List<CandidateDto> searchCandidates(String query, int page) throws Exception {
        String safeQuery = URLEncoder.encode(query.trim().toLowerCase().replaceAll("\\s+", "-"), StandardCharsets.UTF_8);
        String url = String.format(BASE_URL, safeQuery);
        if (page > 1) url += "?page=" + page;

        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                .timeout(TIMEOUT_MS)
                .get();

        Elements cards = doc.select("div.card.resume-link");
        List<CandidateDto> result = new ArrayList<>();

        for (Element card : cards) {
            try {
                String link = card.select("a[href^=/resumes/], a[href^=/resume/]").attr("href");
                if (link.isBlank()) {
                    link = card.select("a[href*='resume']").attr("href");
                }
                if (!link.startsWith("http")) {
                    link = "https://www.work.ua" + link;
                }

                String header = card.select(".resume-header").text();
                String overflow = card.select(".overflow").text();
                String textAll = (header + " " + overflow).trim();

                String firstName = "";
                String lastName = "";
                Matcher m = NAME_PATTERN.matcher(textAll);
                if (m.find()) {
                    firstName = m.group(1);
                    lastName = m.group(2);
                } else {
                    String anchorName = card.select("a[href*=/resume/]").text();
                    if (!anchorName.isBlank()) {
                        String[] parts = anchorName.split("\\s+", 2);
                        firstName = parts[0];
                        if (parts.length > 1) lastName = parts[1];
                    }
                }

                String location = card.select(".text-muted").text();

                String position = header;
                if (position.isBlank()) position = overflow;

                position = position
                        .replaceAll("(?i)\\d+\\s*years? old", "")
                        .replaceAll("(?i)PROFESSIONAL GOAL", "")
                        .replaceAll("(?i)Seeking a position.*", "")
                        .replaceAll("\\s+", " ")
                        .trim();

                if (position.isBlank()) position = "Не вказано";

                CandidateDto dto = CandidateDto.builder()
                        .id(ID_GEN.getAndIncrement())
                        .firstName(firstName)
                        .lastName(lastName)
                        .email(null)
                        .phone(null)
                        .cvLink(link)
                        .position(position + (location.isBlank() ? "" : " | " + location))
                        .status(CandidateStatus.NEW)
                        .createdAt(LocalDateTime.now())
                        .build();

                result.add(dto);
            } catch (Exception ex) {
                System.err.println("⚠️ Error parsing candidate: " + ex.getMessage());
            }
        }
        return result;
    }
}
